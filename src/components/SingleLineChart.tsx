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

interface SingleLineChartProps {
  data: {
    created_at: string;
    [key: string]: string;
  }[];
  field: string;
  title: string;
  color: string;
}

export function SingleLineChart({ data, field, title, color }: SingleLineChartProps) {
  const chartData = {
    labels: data.map(d => format(new Date(d.created_at), 'HH:mm')),
    datasets: [
      {
        label: title,
        data: data.map(d => parseFloat(d[field])),
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
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