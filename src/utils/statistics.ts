interface MetricStats {
  current: number;
  trend: number;
}

interface Stats {
  field1: MetricStats;
  field2: MetricStats;
  field3: MetricStats;
  field4: MetricStats;
  field5: MetricStats;
  field6: MetricStats;
}

export function calculateStats(feeds: any[]): Stats {
  const calculateMetricStats = (field: string): MetricStats => {
    const values = feeds.map(feed => parseFloat(feed[field]));
    const current = values[values.length - 1];
    const previous = values[0];
    const trend = previous ? ((current - previous) / previous) * 100 : 0;
    
    return {
      current: Number(current.toFixed(2)),
      trend: Number(trend.toFixed(1))
    };
  };

  return {
    field1: calculateMetricStats('field1'),
    field2: calculateMetricStats('field2'),
    field3: calculateMetricStats('field3'),
    field4: calculateMetricStats('field4'),
    field5: calculateMetricStats('field5'),
    field6: calculateMetricStats('field6')
  };
}