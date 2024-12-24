import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface LastUpdatedProps {
  date: Date | null;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  if (!date) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Clock size={16} />
      <span>Last updated: {format(date, 'HH:mm:ss')}</span>
    </div>
  );
}