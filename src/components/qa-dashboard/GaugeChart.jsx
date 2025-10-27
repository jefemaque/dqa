import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GaugeChart = ({ value, max = 100, title, color, thresholds }) => {
  const percentage = Math.min((value / max) * 100, 100);

  // Determinar color según umbrales
  let gaugeColor = color || '#3b82f6';
  if (thresholds) {
    if (percentage <= thresholds.low) {
      gaugeColor = '#10b981'; // Verde
    } else if (percentage <= thresholds.medium) {
      gaugeColor = '#f59e0b'; // Naranja
    } else {
      gaugeColor = '#ef4444'; // Rojo
    }
  }

  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage }
  ];

  return (
    <div className="gauge-chart bg-white rounded shadow-sm p-4 text-center">
      <h6 className="mb-3">{title}</h6>

      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill={gaugeColor} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-2">
        <h3 className="mb-0 fw-bold" style={{ color: gaugeColor }}>
          {typeof value === 'number' ? value.toFixed(2) : value}%
        </h3>
        <small className="text-muted">de {max}%</small>
      </div>
    </div>
  );
};

export default GaugeChart;
