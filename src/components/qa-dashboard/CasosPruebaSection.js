import { Row, Col } from 'react-bootstrap';
import KPICard from './KPICard';
import { formatearMesEspañol } from '../../utils/formatUtils';

const CasosPruebaSection = ({ kpis, tendencias }) => {
  // Preparar datos de sparkline para cada KPI
  const prepararSparklineData = (campo) => {
    if (!tendencias || tendencias.length === 0) return [];

    return tendencias.map(t => ({
      mes: formatearMesEspañol(t.mes),
      valor: t[campo] || 0
    }));
  };

  const sparklineDiseñados = prepararSparklineData('cpDiseñados');
  const sparklineNuevos = prepararSparklineData('cpNuevos');
  const sparklineModificados = prepararSparklineData('cpModificados');
  const sparklineReutilizados = prepararSparklineData('cpReutilizados');
  const sparklineAutomatizados = prepararSparklineData('cpAutomatizados');
  const sparklineEjecutados = prepararSparklineData('cpEjecutados');

  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-clipboard-check me-2 text-primary"></i>
        Casos de Prueba
      </h3>

      <Row className="g-3">
        <Col md={6} lg={4}>
          <KPICard
            title="CP Diseñados"
            value={kpis.cpDiseñados.toLocaleString('es-ES')}
            icon="fas fa-pencil-alt"
            color="#10b981"
            sparklineData={sparklineDiseñados}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Nuevos"
            value={kpis.cpNuevos.toLocaleString('es-ES')}
            icon="fas fa-plus-circle"
            color="#3b82f6"
            sparklineData={sparklineNuevos}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Modificados"
            value={kpis.cpModificados.toLocaleString('es-ES')}
            icon="fas fa-edit"
            color="#06b6d4"
            sparklineData={sparklineModificados}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Reutilizados"
            value={kpis.cpReutilizados.toLocaleString('es-ES')}
            icon="fas fa-recycle"
            color="#6b7280"
            sparklineData={sparklineReutilizados}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Automatizados"
            value={kpis.cpAutomatizados.toLocaleString('es-ES')}
            icon="fas fa-robot"
            color="#8b5cf6"
            sparklineData={sparklineAutomatizados}
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Ejecutados"
            value={kpis.cpEjecutados.toLocaleString('es-ES')}
            icon="fas fa-check-circle"
            color="#1e40af"
            sparklineData={sparklineEjecutados}
          />
        </Col>
      </Row>
    </section>
  );
};

export default CasosPruebaSection;
