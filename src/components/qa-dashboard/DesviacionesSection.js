import { Row, Col } from 'react-bootstrap';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPICard from './KPICard';

// Colores para composición de desviaciones
const COLORES_DESVIACIONES = ['#dc2626', '#ef4444', '#f59e0b', '#fb923c', '#fca5a5'];

const DesviacionesSection = ({ kpis }) => {
  // Preparar datos para el Donut Chart
  const datosComposicion = kpis.composicionDesviaciones.map(item => ({
    name: item.tipo,
    value: item.horas,
    porcentaje: parseFloat(item.porcentaje)
  }));

  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
        Desviaciones
      </h3>

      <Row className="g-3 mb-4">
        <Col md={6} lg={4}>
          <KPICard
            title="Horas Desviación Total"
            value={kpis.horasDesviacion.toLocaleString()}
            subtitle="horas"
            icon="fas fa-clock"
            color="#ef4444"
          />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        {/* Gráfico de desviaciones por proyecto */}
        {kpis.horasDesviacionPorProyecto.length > 0 && (
          <Col lg={7}>
            <div className="bg-white rounded shadow-sm p-4 h-100">
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
          </Col>
        )}

        {/* Composición de Desviaciones - Donut Chart */}
        {datosComposicion.length > 0 && (
          <Col lg={5}>
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h5 className="mb-3">
                <i className="fas fa-chart-pie me-2"></i>
                Composición de Desviaciones
              </h5>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={datosComposicion}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.porcentaje}%`}
                    labelLine={false}
                  >
                    {datosComposicion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORES_DESVIACIONES[index % COLORES_DESVIACIONES.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value} hrs (${props.payload.porcentaje}%)`,
                      props.payload.name
                    ]}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
        )}
      </Row>
    </section>
  );
};

export default DesviacionesSection;
