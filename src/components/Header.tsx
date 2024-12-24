import { RefreshCw, Download } from 'lucide-react';
import { LastUpdated } from './LastUpdated';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  loading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
  onExport?: () => void;
}

export function Header({ loading, lastUpdated, onRefresh, onExport }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Air Quality Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Created by Syed Roshan</p>
      </div>
      <div className="flex items-center gap-4">
        <LastUpdated date={lastUpdated} />
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
          aria-label="Refresh data"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
        {onExport && (
          <button
            onClick={onExport}
            className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}