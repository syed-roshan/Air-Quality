import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DualLineChartProps {
  data: {
    created_at: string;
    field1: string;
    field2: string;
  }[];
}

export function DualLineChart({ data }: DualLineChartProps) {
  const chartData = {
    labels: data.map(d => format(new Date(d.created_at), 'HH:mm')),
    datasets: [
      {
        label: 'PM2.5',
        data: data.map(d => parseFloat(d.field1)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'PM10',
        data: data.map(d => parseFloat(d.field2)),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'PM2.5 and PM10 Levels',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={chartData} />;
}