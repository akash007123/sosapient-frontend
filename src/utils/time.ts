import { useEffect, useState } from 'react';

function toDate(input: Date | string | number | null | undefined): Date | null {
  if (!input) return null;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

export function formatAbsoluteDate(input: Date | string | number, locale: string = 'en-US'): string {
  const d = toDate(input);
  if (!d) return 'Unknown date';
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
    .format(d)
    .replace(',', '');
}

export function formatRelativeTime(input: Date | string | number, nowInput?: Date): string {
  const d = toDate(input);
  const now = nowInput ?? new Date();
  if (!d) return 'Unknown date';

  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 45) return 'Just now';
  if (diffMin < 2) return '1 min ago';
  if (diffMin < 60) return `${diffMin} mins ago`;
  if (diffHr < 2) return '1 hour ago';
  if (diffHr < 24) return `${diffHr} hours ago`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;

  return formatAbsoluteDate(d);
}

export function useLiveTimeAgo(input: Date | string | number | null | undefined, refreshMs: number = 30000): string {
  const [value, setValue] = useState<string>(() => formatRelativeTime(input ?? new Date()));

  useEffect(() => {
    setValue(formatRelativeTime(input ?? new Date()));
    const id = setInterval(() => {
      setValue(formatRelativeTime(input ?? new Date()));
    }, refreshMs);
    return () => clearInterval(id);
  }, [input, refreshMs]);

  return value;
}
