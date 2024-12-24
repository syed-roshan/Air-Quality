import { ThingSpeakResponse } from '../types/api';
import { format } from 'date-fns';

export function exportToCsv(data: ThingSpeakResponse) {
  const headers = [
    'Timestamp',
    'PM2.5',
    'PM10',
    'Ozone',
    'Humidity',
    'Temperature',
    'CO'
  ];

  const rows = data.feeds.map(feed => [
    format(new Date(feed.created_at), 'yyyy-MM-dd HH:mm:ss'),
    feed.field1,
    feed.field2,
    feed.field3,
    feed.field4,
    feed.field5,
    feed.field6
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `air-quality-data-${format(new Date(), 'yyyy-MM-dd-HH-mm')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}