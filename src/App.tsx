import { useThingSpeakData } from './hooks/useThingSpeakData';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { exportToCsv } from './utils/csvExport';

export default function App() {
  const { data, loading, error, lastUpdated, refetch } = useThingSpeakData();

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 dark:bg-red-950 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <Header 
          loading={loading} 
          lastUpdated={lastUpdated} 
          onRefresh={refetch} 
          onExport={data ? () => exportToCsv(data) : undefined} 
        />

        {data && (
          <Dashboard data={data} />
        )}
      </div>
    </div>
  );
}