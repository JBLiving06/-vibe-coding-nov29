import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TrendDirection, ConfidenceLevel, ThresholdStatus } from '../types';

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

export function formatPercentage(value: number, includeSign: boolean = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value}%`;
}

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 80) return 'high';
  if (confidence >= 60) return 'medium';
  return 'low';
}

export function getTrendColor(trend: TrendDirection): string {
  switch (trend) {
    case 'rising':
      return 'text-signal-healthy';
    case 'declining':
      return 'text-signal-alert';
    default:
      return 'text-signal-attention';
  }
}

export function getTrendBgColor(trend: TrendDirection): string {
  switch (trend) {
    case 'rising':
      return 'bg-signal-healthy';
    case 'declining':
      return 'bg-signal-alert';
    default:
      return 'bg-signal-attention';
  }
}

export function getTrendIcon(trend: TrendDirection): string {
  switch (trend) {
    case 'rising':
      return '↑';
    case 'declining':
      return '↓';
    default:
      return '→';
  }
}

export function getConfidenceColor(level: ConfidenceLevel): string {
  switch (level) {
    case 'high':
      return 'bg-signal-healthy/10 text-signal-healthy border-signal-healthy/20';
    case 'medium':
      return 'bg-signal-attention/10 text-signal-attention border-signal-attention/20';
    default:
      return 'bg-signal-alert/10 text-signal-alert border-signal-alert/20';
  }
}

export function getStatusColor(status: ThresholdStatus | 'healthy' | 'attention' | 'alert'): string {
  switch (status) {
    case 'crossed':
    case 'healthy':
      return 'bg-signal-healthy/10 text-signal-healthy border-signal-healthy/20';
    case 'approaching':
    case 'attention':
      return 'bg-signal-attention/10 text-signal-attention border-signal-attention/20';
    case 'alert':
    case 'not_met':
      return 'bg-signal-alert/10 text-signal-alert border-signal-alert/20';
    default:
      return 'bg-warm-200 text-warm-600 border-warm-300';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 70) return 'border-signal-healthy';
  if (score >= 50) return 'border-signal-attention';
  return 'border-signal-alert';
}

export function getScoreBgColor(score: number): string {
  if (score >= 70) return 'bg-signal-healthy';
  if (score >= 50) return 'bg-signal-attention';
  return 'bg-signal-alert';
}
