import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}B`;
  }
  return `$${value}M`;
}

export function formatPercentage(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
}

export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= 80) return 'high';
  if (confidence >= 60) return 'medium';
  return 'low';
}

export function getTrendColor(trend: 'rising' | 'stable' | 'declining'): string {
  switch (trend) {
    case 'rising':
      return 'text-signal-healthy';
    case 'declining':
      return 'text-signal-alert';
    default:
      return 'text-signal-attention';
  }
}

export function getTrendIcon(trend: 'rising' | 'stable' | 'declining'): string {
  switch (trend) {
    case 'rising':
      return '↑';
    case 'declining':
      return '↓';
    default:
      return '→';
  }
}

export function getStatusColor(status: 'crossed' | 'approaching' | 'not_met' | 'alert' | 'healthy' | 'attention'): string {
  switch (status) {
    case 'crossed':
    case 'healthy':
      return 'bg-signal-healthy/10 text-signal-healthy border-signal-healthy/20';
    case 'approaching':
    case 'attention':
      return 'bg-signal-attention/10 text-signal-attention border-signal-attention/20';
    case 'alert':
      return 'bg-signal-alert/10 text-signal-alert border-signal-alert/20';
    default:
      return 'bg-warm-200 text-warm-600 border-warm-300';
  }
}
