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
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TestTrendsChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Pruebas Aprobadas',
        data: chartData.aprobadas,
        borderColor: 'rgb(40, 167, 69)',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Pruebas Fallidas',
        data: chartData.fallidas,
        borderColor: 'rgb(220, 53, 69)',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Pruebas Pendientes',
        data: chartData.pendientes,
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h5 className="chart-card-title">Tendencia de Pruebas en el Tiempo</h5>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TestTrendsChart;
