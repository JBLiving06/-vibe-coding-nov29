/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'd3-force-3d' {
  export function forceSimulation(nodes?: any[], dimensions?: number): any;
  export function forceCenter(x?: number, y?: number, z?: number): any;
  export function forceCollide(radius?: number | ((node: any, i: number, nodes: any[]) => number)): any;
  export function forceManyBody(): any;
  export function forceLink(links?: any[]): any;
}
