import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureChartProps {
  data: {
    created_at: string;
    field5: string;
  }[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartData = {
    labels: data.map(d => format(new Date(d.created_at), 'HH:mm')),
    datasets: [
      {
        label: 'Temperature',
        data: data.map(d => parseFloat(d.field5)),
        backgroundColor: data.map(d => {
          const temp = parseFloat(d.field5);
          if (temp < 18) return 'rgba(59, 130, 246, 0.5)';
          if (temp < 24) return 'rgba(34, 197, 94, 0.5)';
          return 'rgba(249, 115, 22, 0.5)';
        }),
        borderColor: data.map(d => {
          const temp = parseFloat(d.field5);
          if (temp < 18) return 'rgb(59, 130, 246)';
          if (temp < 24) return 'rgb(34, 197, 94)';
          return 'rgb(249, 115, 22)';
        }),
        borderWidth: 1,
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
        text: 'Temperature',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}