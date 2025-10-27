import { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ExcelUploader from './ExcelUploader';
import MetricCard from './MetricCard';
import TestTrendsChart from './TestTrendsChart';
import TestDistributionChart from './TestDistributionChart';
import { calculateTestingMetrics, prepareChartData } from '../utils/excelProcessor';

const Dashboard = () => {
  const [testData, setTestData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalPruebas: 0,
    totalAprobadas: 0,
    totalFallidas: 0,
    totalPendientes: 0,
    tasaExito: 0,
    tiempoPromedio: 0
  });
  const [chartData, setChartData] = useState({
    labels: [],
    aprobadas: [],
    fallidas: [],
    pendientes: []
  });

  const handleDataLoaded = (data) => {
    setTestData(data);

    // Calcular métricas
    const calculatedMetrics = calculateTestingMetrics(data);
    setMetrics(calculatedMetrics);

    // Preparar datos para gráficos
    const preparedChartData = prepareChartData(data);
    setChartData(preparedChartData);
  };

  const hasData = testData.length > 0;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>
          <i className="fas fa-chart-line me-3"></i>
          Dashboard de Indicadores de Fábrica de Testing
        </h1>
        <p>Monitor y análisis de resultados de pruebas de calidad</p>
      </div>

      {/* Uploader */}
      <ExcelUploader onDataLoaded={handleDataLoaded} />

      {/* Métricas principales */}
      {hasData && (
        <>
          <Row className="mb-4">
            <Col md={6} lg={3}>
              <MetricCard
                title="Total de Pruebas"
                value={metrics.totalPruebas}
                icon="fas fa-vial"
                color="bg-primary"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Pruebas Aprobadas"
                value={metrics.totalAprobadas}
                icon="fas fa-check-circle"
                color="bg-success"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Pruebas Fallidas"
                value={metrics.totalFallidas}
                icon="fas fa-times-circle"
                color="bg-danger"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Tasa de Éxito"
                value={`${metrics.tasaExito}%`}
                icon="fas fa-trophy"
                color="bg-warning"
              />
            </Col>
          </Row>

          {/* Gráficos */}
          <Row className="mb-4">
            <Col lg={8}>
              <TestTrendsChart chartData={chartData} />
            </Col>
            <Col lg={4}>
              <TestDistributionChart metrics={metrics} />
            </Col>
          </Row>

          {/* Métrica adicional */}
          <Row className="mb-4">
            <Col md={6} lg={3}>
              <MetricCard
                title="Pruebas Pendientes"
                value={metrics.totalPendientes}
                icon="fas fa-clock"
                color="bg-info"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Tiempo Promedio"
                value={metrics.tiempoPromedio}
                icon="fas fa-stopwatch"
                color="bg-primary"
                subtitle="min"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Días Analizados"
                value={testData.length}
                icon="fas fa-calendar-alt"
                color="bg-success"
              />
            </Col>
            <Col md={6} lg={3}>
              <MetricCard
                title="Promedio Diario"
                value={Math.round(metrics.totalPruebas / testData.length)}
                icon="fas fa-chart-bar"
                color="bg-info"
                subtitle="pruebas/día"
              />
            </Col>
          </Row>

          {/* Tabla de datos */}
          <div className="table-card">
            <div className="chart-card-header">
              <h5 className="chart-card-title">Datos Detallados</h5>
            </div>
            <div className="table-responsive">
              <Table className="custom-table" striped hover>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Total Pruebas</th>
                    <th>Aprobadas</th>
                    <th>Fallidas</th>
                    <th>Pendientes</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {testData.map((row, index) => {
                    const totalPruebas = parseInt(row['Total Pruebas'] || row['TotalPruebas'] || 0);
                    const aprobadas = parseInt(row['Aprobadas'] || row['Passed'] || 0);
                    const tasaRow = totalPruebas > 0 ? ((aprobadas / totalPruebas) * 100).toFixed(1) : 0;
                    const esExitoso = tasaRow >= 90;

                    return (
                      <tr key={index}>
                        <td>{row['Fecha'] || row['Date'] || '-'}</td>
                        <td>{totalPruebas}</td>
                        <td>{aprobadas}</td>
                        <td>{row['Fallidas'] || row['Failed'] || 0}</td>
                        <td>{row['Pendientes'] || row['Pending'] || 0}</td>
                        <td>
                          <span className={esExitoso ? 'badge-success' : 'badge-danger'}>
                            {tasaRow}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </>
      )}

      {/* Mensaje cuando no hay datos */}
      {!hasData && (
        <div className="text-center text-muted py-5">
          <i className="fas fa-chart-pie" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
          <h4 className="mt-3">No hay datos cargados</h4>
          <p>Carga un archivo Excel para ver los indicadores y gráficos</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
