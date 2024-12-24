import { ThingSpeakResponse } from '../types/api';
import { DataSummary } from './DataSummary';
import { DualLineChart } from './DualLineChart';
import { SingleLineChart } from './SingleLineChart';
import { TemperatureChart } from './TemperatureChart';

interface DashboardProps {
  data: ThingSpeakResponse;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <>
      <div className="mb-8">
        <DataSummary data={data} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard>
          <DualLineChart data={data.feeds} />
        </ChartCard>
        <ChartCard>
          <SingleLineChart 
            data={data.feeds} 
            field="field3" 
            title="Ozone Levels" 
            color="rgb(139, 92, 246)" 
          />
        </ChartCard>
        <ChartCard>
          <SingleLineChart 
            data={data.feeds} 
            field="field4" 
            title="Humidity" 
            color="rgb(14, 165, 233)" 
          />
        </ChartCard>
        <ChartCard>
          <TemperatureChart data={data.feeds} />
        </ChartCard>
        <ChartCard>
          <SingleLineChart 
            data={data.feeds} 
            field="field6" 
            title="CO Levels" 
            color="rgb(239, 68, 68)" 
          />
        </ChartCard>
      </div>
    </>
  );
}

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {children}
    </div>
  );
}