/**
 * Accessibility utilities
 *
 * Provides helpers for:
 * - ARIA label generation
 * - Focus management
 * - Screen reader announcements
 * - Keyboard navigation
 */

import React, { useEffect, useRef, useCallback } from 'react';
import type { ConstellationNode } from '../components/ConstellationCanvas/types';

/**
 * Generate ARIA label for a constellation node
 */
export function getNodeAriaLabel(node: ConstellationNode): string {
  const statusText = {
    healthy: 'healthy signal',
    attention: 'needs attention',
    alert: 'urgent alert',
  };

  return `${node.label}, score ${node.score}, ${statusText[node.status]}`;
}

/**
 * Generate ARIA label for constellation summary
 */
export function getConstellationAriaLabel(nodes: ConstellationNode[]): string {
  const healthyCount = nodes.filter((n) => n.status === 'healthy').length;
  const attentionCount = nodes.filter((n) => n.status === 'attention').length;
  const alertCount = nodes.filter((n) => n.status === 'alert').length;

  const parts: string[] = [];

  if (healthyCount > 0) {
    parts.push(`${healthyCount} healthy`);
  }
  if (attentionCount > 0) {
    parts.push(`${attentionCount} need attention`);
  }
  if (alertCount > 0) {
    parts.push(`${alertCount} urgent`);
  }

  return `Constellation with ${nodes.length} signals: ${parts.join(', ')}`;
}

/**
 * Hook for focus trap within a container
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook for keyboard navigation in a list
 */
export function useArrowNavigation<T extends HTMLElement>(
  items: string[],
  onSelect: (id: string) => void
) {
  const containerRef = useRef<T>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const currentIndex = items.findIndex(
        (id) => document.activeElement?.getAttribute('data-node-id') === id
      );

      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = items.length - 1;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (currentIndex >= 0) {
            onSelect(items[currentIndex]);
          }
          return;
        default:
          return;
      }

      // Focus the new item
      const nextItem = containerRef.current.querySelector<HTMLElement>(
        `[data-node-id="${items[nextIndex]}"]`
      );
      nextItem?.focus();
    },
    [items, onSelect]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return containerRef;
}

/**
 * Live region announcer for screen readers
 */
class LiveAnnouncer {
  private element: HTMLDivElement | null = null;
  private timeoutId: number | null = null;

  constructor() {
    if (typeof document !== 'undefined') {
      this.element = document.createElement('div');
      this.element.setAttribute('aria-live', 'polite');
      this.element.setAttribute('aria-atomic', 'true');
      this.element.className = 'sr-only';
      document.body.appendChild(this.element);
    }
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.element) return;

    // Clear any pending announcement
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.element.setAttribute('aria-live', priority);

    // Clear then set to trigger announcement
    this.element.textContent = '';
    this.timeoutId = window.setTimeout(() => {
      if (this.element) {
        this.element.textContent = message;
      }
    }, 100);
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Singleton announcer
let announcer: LiveAnnouncer | null = null;

export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (!announcer) {
    announcer = new LiveAnnouncer();
  }
  announcer.announce(message, priority);
}

/**
 * Check contrast ratio between two colors
 * Returns true if contrast is >= 4.5:1 (WCAG AA for normal text)
 */
export function checkContrast(foreground: string, background: string): boolean {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    const color = hex.replace('#', '');

    // Parse RGB values
    const r = parseInt(color.slice(0, 2), 16) / 255;
    const g = parseInt(color.slice(2, 4), 16) / 255;
    const b = parseInt(color.slice(4, 6), 16) / 255;

    // Convert to linear values
    const toLinear = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  return ratio >= 4.5;
}

/**
 * Skip link component for keyboard users
 */
export function SkipLink({ targetId, children }: { targetId: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.tabIndex = -1;
      target.focus();
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-warm-800 focus:text-white focus:rounded"
    >
      {children}
    </a>
  );
}
