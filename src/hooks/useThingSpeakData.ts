import { useState, useEffect } from 'react';
import { ThingSpeakResponse } from '../types/api';

const API_URL = 'https://api.thingspeak.com/channels/1596152/feeds.json?results=24';

export function useThingSpeakData(refreshInterval = 3600000) { // 1 hour in milliseconds
  const [data, setData] = useState<ThingSpeakResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const newData = await response.json();
      setData(newData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}