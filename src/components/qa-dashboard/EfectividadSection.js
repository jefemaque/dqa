import { Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import KPICard from './KPICard';

const EfectividadSection = ({ kpis, tendencias }) => {
  const getSemaforoColor = (valor) => {
    if (valor >= 90) return 'success';
    if (valor >= 70) return 'warning';
    return 'danger';
  };

  const getSemaforoIcon = (valor) => {
    if (valor >= 90) return '🟢';
    if (valor >= 70) return '🟡';
    return '🔴';
  };

  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-trophy me-2 text-warning"></i>
        Efectividad
      </h3>

      <Row className="g-3">
        <Col md={6}>
          <KPICard
            title="Efectividad Ciclo 1"
            value={`${kpis.efectividadCiclo1}%`}
            icon="fas fa-star"
            color="#f59e0b"
            badge={{
              className: `bg-${getSemaforoColor(kpis.efectividadCiclo1)}`,
              text: `${getSemaforoIcon(kpis.efectividadCiclo1)} ${kpis.efectividadCiclo1 >= 90 ? 'Excelente' : kpis.efectividadCiclo1 >= 70 ? 'Aceptable' : 'Mejorar'}`
            }}
          />
        </Col>

        <Col md={6}>
          <KPICard
            title="Efectividad Ciclos QA"
            value={`${kpis.efectividadCiclosQA}%`}
            icon="fas fa-check-double"
            color="#3b82f6"
            badge={{
              className: `bg-${getSemaforoColor(kpis.efectividadCiclosQA)}`,
              text: `${getSemaforoIcon(kpis.efectividadCiclosQA)} ${kpis.efectividadCiclosQA >= 90 ? 'Excelente' : kpis.efectividadCiclosQA >= 70 ? 'Aceptable' : 'Mejorar'}`
            }}
          />
        </Col>

        <Col md={6}>
          <KPICard
            title="Efectividad UAT"
            value={`${kpis.efectividadUAT}%`}
            icon="fas fa-user-check"
            color="#8b5cf6"
            badge={{
              className: `bg-${getSemaforoColor(kpis.efectividadUAT)}`,
              text: `${getSemaforoIcon(kpis.efectividadUAT)} ${kpis.efectividadUAT >= 90 ? 'Excelente' : kpis.efectividadUAT >= 70 ? 'Aceptable' : 'Mejorar'}`
            }}
          />
        </Col>

        <Col md={6}>
          <KPICard
            title="Efectividad General (Ejecución)"
            value={`${kpis.efectividadEjecucion}%`}
            icon="fas fa-chart-line"
            color="#10b981"
            badge={{
              className: `bg-${getSemaforoColor(kpis.efectividadEjecucion)}`,
              text: `${getSemaforoIcon(kpis.efectividadEjecucion)} ${kpis.efectividadEjecucion >= 90 ? 'Excelente' : kpis.efectividadEjecucion >= 70 ? 'Aceptable' : 'Mejorar'}`
            }}
          />
        </Col>
      </Row>

      {/* Gráfico de tendencia de efectividad */}
      {tendencias.length > 0 && (
        <div className="bg-white rounded shadow-sm p-4 mt-4">
          <h5 className="mb-3">
            <i className="fas fa-chart-line me-2"></i>
            Tendencia de Efectividad Mensual
          </h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tendencias.map(t => ({
              mes: t.mes.substring(5),
              'Ciclo 1': t.efectividadCiclo1,
              'Ciclos QA': t.efectividadCiclosQA,
              'UAT': t.efectividadUAT,
              'General': t.efectividadEjecucion
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={90} stroke="#10b981" strokeDasharray="3 3" label="Meta 90%" />
              <Line type="monotone" dataKey="Ciclo 1" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="Ciclos QA" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="UAT" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="General" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default EfectividadSection;
