import { Row, Col } from 'react-bootstrap';
import KPICard from './KPICard';

const CasosPruebaSection = ({ kpis }) => {
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
            value={kpis.cpDiseñados.toLocaleString()}
            icon="fas fa-pencil-alt"
            color="#10b981"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Nuevos"
            value={kpis.cpNuevos.toLocaleString()}
            icon="fas fa-plus-circle"
            color="#3b82f6"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Modificados"
            value={kpis.cpModificados.toLocaleString()}
            icon="fas fa-edit"
            color="#06b6d4"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Reutilizados"
            value={kpis.cpReutilizados.toLocaleString()}
            icon="fas fa-recycle"
            color="#6b7280"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Automatizados"
            value={kpis.cpAutomatizados.toLocaleString()}
            icon="fas fa-robot"
            color="#8b5cf6"
          />
        </Col>

        <Col md={6} lg={4}>
          <KPICard
            title="CP Ejecutados"
            value={kpis.cpEjecutados.toLocaleString()}
            icon="fas fa-check-circle"
            color="#1e40af"
          />
        </Col>
      </Row>
    </section>
  );
};

export default CasosPruebaSection;
