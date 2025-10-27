import { Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KPICard from './KPICard';

const DesviacionesSection = ({ kpis }) => {
  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
        Desviaciones
      </h3>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <KPICard
            title="Horas Desviación Total"
            value={kpis.horasDesviacion.toLocaleString()}
            subtitle="horas"
            icon="fas fa-clock"
            color="#ef4444"
          />
        </Col>
      </Row>

      {/* Gráfico de desviaciones por proyecto */}
      {kpis.horasDesviacionPorProyecto.length > 0 && (
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="mb-3">
            <i className="fas fa-chart-bar me-2"></i>
            Horas de Desviación por Proyecto (Top 10)
          </h5>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={kpis.horasDesviacionPorProyecto}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="proyecto" type="category" width={140} />
              <Tooltip />
              <Bar dataKey="horas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default DesviacionesSection;
