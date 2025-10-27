import { Row, Col } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KPICard from './KPICard';
import GaugeChart from './GaugeChart';

const DefectosSection = ({ kpis, tendencias }) => {
  // Preparar datos para gráfico de severidad Shift Left
  const datosShiftLeft = tendencias.map(t => ({
    mes: t.mes.substring(5),
    Bloqueantes: t.issuesPorSeveridadShiftLeft.bloqueantes,
    Críticos: t.issuesPorSeveridadShiftLeft.criticos,
    Altos: t.issuesPorSeveridadShiftLeft.altos,
    Menores: t.issuesPorSeveridadShiftLeft.menores
  }));

  // Preparar datos para gráfico de severidad Ejecución
  const datosEjecucion = tendencias.map(t => ({
    mes: t.mes.substring(5),
    Bloqueantes: t.issuesPorSeveridadEjecucion.bloqueantes,
    Críticos: t.issuesPorSeveridadEjecucion.criticos,
    Altos: t.issuesPorSeveridadEjecucion.altos,
    Menores: t.issuesPorSeveridadEjecucion.menores
  }));

  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-bug me-2 text-danger"></i>
        Defectos (Issues)
      </h3>

      {/* Primera fila: Issues totales */}
      <Row className="g-3 mb-3">
        <Col md={6} lg={4}>
          <KPICard
            title="Issues Shift Left"
            value={kpis.issuesShiftLeft.toLocaleString()}
            icon="fas fa-exclamation-triangle"
            color="#f59e0b"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="Issues Ejecución"
            value={kpis.issuesEjecucion.toLocaleString()}
            icon="fas fa-exclamation-circle"
            color="#ef4444"
          />
        </Col>

        <Col md={12} lg={4}>
          <div className="kpi-card bg-gradient-danger text-white rounded shadow-sm p-4 h-100"
            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <p className="mb-1 small opacity-75">Total Issues</p>
                <h1 className="mb-0 fw-bold">{kpis.totalIssues.toLocaleString()}</h1>
              </div>
              <div className="kpi-icon rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center"
                style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>
                <i className="fas fa-bug"></i>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Segunda fila: Escape Rates y MTTR */}
      <Row className="g-3 mb-3">
        <Col md={6} lg={4}>
          <GaugeChart
            title="Escape Rate UAT"
            value={kpis.escapeRateUAT}
            max={100}
            thresholds={{ low: 10, medium: 20 }}
          />
        </Col>

        <Col md={6} lg={4}>
          <GaugeChart
            title="Escape Rate Productivo"
            value={kpis.escapeRateProductivo}
            max={100}
            thresholds={{ low: 5, medium: 10 }}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="MTTR Promedio"
            value={kpis.mttrPromedio}
            subtitle="días"
            icon="fas fa-clock"
            color="#8b5cf6"
            badge={
              kpis.mttrPromedio <= 3
                ? { className: 'bg-success', text: 'Excelente' }
                : kpis.mttrPromedio <= 7
                  ? { className: 'bg-warning', text: 'Aceptable' }
                  : { className: 'bg-danger', text: 'Mejorar' }
            }
          />
        </Col>
      </Row>

      {/* Tercera fila: Issues no resueltos */}
      <Row className="g-3 mb-3">
        <Col md={12}>
          <KPICard
            title="Issues No Resueltos"
            value={kpis.issuesNoResueltos.toLocaleString()}
            icon="fas fa-times-circle"
            color="#dc2626"
          />
        </Col>
      </Row>

      {/* Gráfico de severidad Shift Left */}
      {datosShiftLeft.length > 0 && (
        <div className="bg-white rounded shadow-sm p-4 mb-3">
          <h5 className="mb-3">
            <i className="fas fa-chart-area me-2"></i>
            Issues por Severidad - Shift Left
          </h5>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosShiftLeft}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Bloqueantes" stackId="1" stroke="#dc2626" fill="#dc2626" />
              <Area type="monotone" dataKey="Críticos" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="Altos" stackId="1" stroke="#eab308" fill="#eab308" />
              <Area type="monotone" dataKey="Menores" stackId="1" stroke="#84cc16" fill="#84cc16" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfico de severidad Ejecución */}
      {datosEjecucion.length > 0 && (
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="mb-3">
            <i className="fas fa-chart-area me-2"></i>
            Issues por Severidad - Ejecución
          </h5>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosEjecucion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Bloqueantes" stackId="1" stroke="#dc2626" fill="#dc2626" />
              <Area type="monotone" dataKey="Críticos" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="Altos" stackId="1" stroke="#eab308" fill="#eab308" />
              <Area type="monotone" dataKey="Menores" stackId="1" stroke="#84cc16" fill="#84cc16" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default DefectosSection;
