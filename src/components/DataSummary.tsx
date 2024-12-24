import { ThingSpeakResponse } from '../types/api';
import { calculateStats } from '../utils/statistics';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataSummaryProps {
  data: ThingSpeakResponse;
}

export function DataSummary({ data }: DataSummaryProps) {
  const stats = calculateStats(data.feeds);
  
  const metrics = [
    { name: 'PM2.5', value: stats.field1, unit: 'µg/m³' },
    { name: 'PM10', value: stats.field2, unit: 'µg/m³' },
    { name: 'Ozone', value: stats.field3, unit: 'ppb' },
    { name: 'Humidity', value: stats.field4, unit: '%' },
    { name: 'Temperature', value: stats.field5, unit: '°C' },
    { name: 'CO', value: stats.field6, unit: 'ppm' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-semibold">
              {metric.value.current}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metric.unit}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm">
            {metric.value.trend > 0 ? (
              <TrendingUp className="text-red-500" size={16} />
            ) : metric.value.trend < 0 ? (
              <TrendingDown className="text-green-500" size={16} />
            ) : (
              <Minus className="text-gray-500" size={16} />
            )}
            <span className={metric.value.trend > 0 ? 'text-red-500' : 'text-green-500'}>
              {Math.abs(metric.value.trend)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}