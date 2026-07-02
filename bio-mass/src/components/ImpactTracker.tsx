import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Batch {
  id: number;
  name: string;
  status: string;
  energy_output: number;
  start_date: string;
  location: string;
}

interface ImpactTrackerProps {
  batches: Batch[];
}

function groupByMonth(batches: Batch[]) {
  const months: Record<string, { total: number; sortDate: Date }> = {};

  batches.forEach((b) => {
    const date = new Date(b.start_date);
    const key = date.toLocaleString("default", { month: "short", year: "numeric" });
    if (!months[key]) {
      months[key] = { total: 0, sortDate: date };
    }
    months[key].total += b.energy_output;
  });

  return Object.entries(months)
    .sort(([, a], [, b]) => a.sortDate.getTime() - b.sortDate.getTime())
    .map(([month, { total }]) => ({ month, total: Math.round(total) }));
}

export default function ImpactTracker({ batches }: ImpactTrackerProps) {
  const chartData = groupByMonth(batches);
  const grandTotal = chartData.reduce((sum, d) => sum + d.total, 0);

  if (chartData.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-center">
        <p className="text-slate-400">No data yet. Start processing batches to see your impact.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Biomass Processed</h3>
          <p className="text-sm text-slate-400">Total energy output over time</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-teal-400">
            {grandTotal.toLocaleString()} kWh
          </p>
          <p className="text-xs text-slate-500">Cumulative total</p>
        </div>
      </div>

      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
              <Bar
              dataKey="total"
              fill="#2DD4BF"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-4 text-sm">
        {chartData.slice(-3).map((d) => (
          <div key={d.month} className="flex-1 bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-slate-400 text-xs">{d.month}</p>
            <p className="text-white font-bold">{d.total.toLocaleString()}</p>
            <p className="text-slate-500 text-xs">kWh</p>
          </div>
        ))}
      </div>
    </div>
  );
}