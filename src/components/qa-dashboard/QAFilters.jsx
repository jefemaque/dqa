import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const QAFilters = ({ filters, opciones, onFilterChange, rawData }) => {
  const [subcarterasDisponibles, setSubcarterasDisponibles] = useState([]);
  const [proyectosDisponibles, setProyectosDisponibles] = useState([]);

  // Actualizar subcarteras cuando cambia la cartera
  useEffect(() => {
    if (filters.cartera) {
      const subcarteras = [...new Set(
        rawData
          .filter(row => row.Cartera === filters.cartera && row.Subcartera)
          .map(row => row.Subcartera)
      )];
      setSubcarterasDisponibles(subcarteras);
    } else {
      setSubcarterasDisponibles(opciones.subcarteras);
    }
  }, [filters.cartera, rawData, opciones.subcarteras]);

  // Actualizar proyectos cuando cambian cartera o subcarteras
  useEffect(() => {
    let proyectosFiltrados = rawData;

    if (filters.cartera) {
      proyectosFiltrados = proyectosFiltrados.filter(row => row.Cartera === filters.cartera);
    }

    if (filters.subcarteras.length > 0) {
      proyectosFiltrados = proyectosFiltrados.filter(row =>
        filters.subcarteras.includes(row.Subcartera)
      );
    }

    const proyectos = [...new Set(proyectosFiltrados.map(row => row.Proyecto))].filter(Boolean);
    setProyectosDisponibles(proyectos);
  }, [filters.cartera, filters.subcarteras, rawData]);

  const handleEstadoToggle = (estado) => {
    const nuevosEstados = filters.estados.includes(estado)
      ? filters.estados.filter(e => e !== estado)
      : [...filters.estados, estado];

    onFilterChange({ estados: nuevosEstados });
  };

  const handleSubcarteraToggle = (subcartera) => {
    const nuevasSubcarteras = filters.subcarteras.includes(subcartera)
      ? filters.subcarteras.filter(s => s !== subcartera)
      : [...filters.subcarteras, subcartera];

    onFilterChange({ subcarteras: nuevasSubcarteras });
  };

  const handleProyectoToggle = (proyecto) => {
    const nuevosProyectos = filters.proyectos.includes(proyecto)
      ? filters.proyectos.filter(p => p !== proyecto)
      : [...filters.proyectos, proyecto];

    onFilterChange({ proyectos: nuevosProyectos });
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h5 className="mb-3">
        <i className="fas fa-filter me-2"></i>
        Filtros Globales
      </h5>

      <Row>
        {/* Filtro Año */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Año</Form.Label>
            <Form.Select
              value={filters.año || ''}
              onChange={(e) => onFilterChange({ año: e.target.value ? parseInt(e.target.value) : null })}
            >
              <option value="">Todos</option>
              {opciones.años.map(año => (
                <option key={año} value={año}>{año}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Filtro Cartera */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Cartera</Form.Label>
            <Form.Select
              value={filters.cartera}
              onChange={(e) => onFilterChange({ cartera: e.target.value, subcarteras: [], proyectos: [] })}
            >
              <option value="">Todas</option>
              {opciones.carteras.map(cartera => (
                <option key={cartera} value={cartera}>{cartera}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Filtro Subcartera */}
        {subcarterasDisponibles.length > 0 && (
          <Col md={6} lg={2}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Subcartera</Form.Label>
              <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '4px', padding: '0.5rem' }}>
                {subcarterasDisponibles.map(subcartera => (
                  <Form.Check
                    key={subcartera}
                    type="checkbox"
                    id={`subcartera-${subcartera}`}
                    label={subcartera}
                    checked={filters.subcarteras.includes(subcartera)}
                    onChange={() => handleSubcarteraToggle(subcartera)}
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        )}

        {/* Filtro Proyecto */}
        <Col md={6} lg={3}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Proyecto</Form.Label>
            <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '4px', padding: '0.5rem' }}>
              {proyectosDisponibles.map(proyecto => (
                <Form.Check
                  key={proyecto}
                  type="checkbox"
                  id={`proyecto-${proyecto}`}
                  label={proyecto}
                  checked={filters.proyectos.includes(proyecto)}
                  onChange={() => handleProyectoToggle(proyecto)}
                />
              ))}
            </div>
          </Form.Group>
        </Col>

        {/* Filtro Estado */}
        <Col md={6} lg={3}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado</Form.Label>
            <div>
              {opciones.estados.map(estado => (
                <Form.Check
                  key={estado}
                  type="checkbox"
                  id={`estado-${estado}`}
                  label={estado}
                  checked={filters.estados.includes(estado)}
                  onChange={() => handleEstadoToggle(estado)}
                />
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Botón para limpiar filtros */}
      <div className="text-end">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onFilterChange({
            año: new Date().getFullYear(),
            cartera: '',
            subcarteras: [],
            proyectos: [],
            estados: ['Terminado', 'En curso', 'Por iniciar']
          })}
        >
          <i className="fas fa-redo me-1"></i>
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default QAFilters;
