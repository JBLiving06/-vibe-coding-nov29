/**
 * Force Layout Worker
 *
 * Runs d3-force-3d simulation off the main thread.
 * Streams position updates via postMessage with frame budgeting.
 */

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from 'd3-force-3d';

// Types
interface Node {
  id: string;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  fx?: number | null;
  fy?: number | null;
  fz?: number | null;
  group?: number;
  size?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength?: number;
}

interface InitMessage {
  type: 'init';
  nodes: Node[];
  links: Link[];
  dimensions?: 2 | 3;
  alpha?: number;
}

interface UpdateMessage {
  type: 'update';
  nodes?: Partial<Node>[];
  links?: Link[];
}

interface ControlMessage {
  type: 'start' | 'stop' | 'reheat' | 'tick';
  alpha?: number;
}

interface PinMessage {
  type: 'pin';
  nodeId: string;
  position?: { x: number; y: number; z: number };
}

type WorkerMessage = InitMessage | UpdateMessage | ControlMessage | PinMessage;

interface PositionUpdate {
  type: 'positions';
  nodes: Array<{ id: string; x: number; y: number; z: number }>;
  alpha: number;
  tickTime: number; // ms spent ticking this batch
}

interface ReadyMessage {
  type: 'ready';
}

// Worker state
let simulation: ReturnType<typeof forceSimulation> | null = null;
let nodes: Node[] = [];
let links: Link[] = [];
let isRunning = false;
let dimensions = 3;

// Frame budget: max ms per tick batch
const FRAME_BUDGET_MS = 8;

/**
 * Initialize the simulation
 */
function initSimulation(msg: InitMessage) {
  nodes = msg.nodes.map((n) => ({
    ...n,
    x: n.x ?? (Math.random() - 0.5) * 100,
    y: n.y ?? (Math.random() - 0.5) * 100,
    z: dimensions === 3 ? (n.z ?? (Math.random() - 0.5) * 100) : 0,
  }));

  links = msg.links.map((l) => ({ ...l }));
  dimensions = msg.dimensions ?? 3;

  // Create simulation
  simulation = forceSimulation(nodes, dimensions)
    .force(
      'link',
      forceLink(links)
        .id((d: Node) => d.id)
        .distance(30)
        .strength((l: Link) => l.strength ?? 0.5)
    )
    .force('charge', forceManyBody().strength(-100).distanceMax(200))
    .force('center', forceCenter(0, 0, dimensions === 3 ? 0 : undefined))
    .force('collide', forceCollide().radius((d: Node) => (d.size ?? 5) + 2))
    .alpha(msg.alpha ?? 1)
    .alphaDecay(0.02)
    .velocityDecay(0.4)
    .stop(); // Don't auto-run

  // Send ready message
  const ready: ReadyMessage = { type: 'ready' };
  self.postMessage(ready);
}

/**
 * Run simulation ticks with frame budgeting
 */
function runTicks() {
  if (!simulation || !isRunning) return;

  const startTime = performance.now();
  let tickCount = 0;

  // Run ticks until we exceed frame budget or simulation cools
  while (performance.now() - startTime < FRAME_BUDGET_MS) {
    simulation.tick();
    tickCount++;

    // Check if simulation has cooled
    if (simulation.alpha() < 0.001) {
      isRunning = false;
      break;
    }
  }

  // Send position updates
  if (tickCount > 0) {
    const tickTime = performance.now() - startTime;
    const update: PositionUpdate = {
      type: 'positions',
      nodes: nodes.map((n) => ({
        id: n.id,
        x: n.x ?? 0,
        y: n.y ?? 0,
        z: n.z ?? 0,
      })),
      alpha: simulation.alpha(),
      tickTime,
    };
    self.postMessage(update);
  }

  // Schedule next batch if still running
  if (isRunning) {
    // Use setTimeout to yield to other work
    setTimeout(runTicks, 0);
  }
}

/**
 * Handle incoming messages
 */
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const msg = event.data;

  switch (msg.type) {
    case 'init':
      initSimulation(msg);
      break;

    case 'start':
      if (simulation) {
        isRunning = true;
        runTicks();
      }
      break;

    case 'stop':
      isRunning = false;
      break;

    case 'reheat':
      if (simulation) {
        simulation.alpha(msg.alpha ?? 0.5).restart();
        isRunning = true;
        runTicks();
      }
      break;

    case 'tick':
      // Single tick (for manual stepping)
      if (simulation) {
        const tickStart = performance.now();
        simulation.tick();
        const update: PositionUpdate = {
          type: 'positions',
          nodes: nodes.map((n) => ({
            id: n.id,
            x: n.x ?? 0,
            y: n.y ?? 0,
            z: n.z ?? 0,
          })),
          alpha: simulation.alpha(),
          tickTime: performance.now() - tickStart,
        };
        self.postMessage(update);
      }
      break;

    case 'pin':
      // Pin a node to a position (for dragging)
      if (simulation) {
        const node = nodes.find((n) => n.id === msg.nodeId);
        if (node) {
          if (msg.position) {
            node.fx = msg.position.x;
            node.fy = msg.position.y;
            node.fz = dimensions === 3 ? msg.position.z : null;
          } else {
            // Unpin
            node.fx = null;
            node.fy = null;
            node.fz = null;
          }
        }
      }
      break;

    case 'update':
      // Update nodes/links
      if (msg.nodes) {
        msg.nodes.forEach((update) => {
          const node = nodes.find((n) => n.id === update.id);
          if (node) {
            Object.assign(node, update);
          }
        });
      }
      if (msg.links && simulation) {
        links = msg.links;
        const linkForce = simulation.force('link');
        if (linkForce) {
          (linkForce as ReturnType<typeof forceLink>).links(links);
        }
      }
      break;
  }
};

// Signal that worker is loaded
self.postMessage({ type: 'loaded' });
