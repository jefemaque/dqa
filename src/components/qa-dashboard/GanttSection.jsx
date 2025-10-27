import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

const GanttSection = ({ datos, proyectoSeleccionado, onProyectoClick, onVolverClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (datos.length === 0) {
    return null;
  }

  // Calcular rango de fechas
  const todasLasFechas = datos.flatMap(d => [new Date(d.inicio), new Date(d.fin)]);
  const fechaMin = new Date(Math.min(...todasLasFechas));
  const fechaMax = new Date(Math.max(...todasLasFechas));
  const totalDias = differenceInDays(fechaMax, fechaMin);

  const getColorPorEstado = (estado) => {
    switch (estado) {
      case 'Concluido':
      case 'Terminado':
        return '#10b981';
      case 'En Curso':
      case 'En curso':
        return '#3b82f6';
      case 'Por iniciar':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const calcularPosicion = (fecha) => {
    const dias = differenceInDays(new Date(fecha), fechaMin);
    return ((dias / totalDias) * 100).toFixed(2);
  };

  const calcularAncho = (inicio, fin) => {
    const dias = differenceInDays(new Date(fin), new Date(inicio));
    return Math.max(((dias / totalDias) * 100), 2).toFixed(2);
  };

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">
          <i className="fas fa-calendar-alt me-2 text-primary"></i>
          {proyectoSeleccionado
            ? `Cronograma: ${proyectoSeleccionado}`
            : 'Cronograma de Proyectos'
          }
        </h3>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`fas fa-chevron-${isCollapsed ? 'down' : 'up'} me-2`}></i>
          {isCollapsed ? 'Expandir' : 'Colapsar'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="bg-white rounded shadow-sm p-4">
          {proyectoSeleccionado && (
            <div className="mb-3">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={onVolverClick}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Volver a vista general
              </button>
            </div>
          )}

          {/* Timeline */}
          <div className="gantt-timeline mb-3" style={{ fontSize: '0.85rem' }}>
            <div className="d-flex justify-content-between text-muted">
              <span>{format(fechaMin, 'dd MMM yyyy', { locale: es })}</span>
              <span>{format(fechaMax, 'dd MMM yyyy', { locale: es })}</span>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="gantt-chart" style={{ minHeight: '300px' }}>
            {datos.map((item, index) => {
              const posicion = calcularPosicion(item.inicio);
              const ancho = calcularAncho(item.inicio, item.fin);
              const color = getColorPorEstado(item.estado);
              const nombre = item.nombre || item.actividad;

              return (
                <div
                  key={index}
                  className="gantt-row mb-3 p-2 border-bottom"
                  style={{ position: 'relative' }}
                >
                  {/* Nombre */}
                  <div className="d-flex align-items-center mb-2">
                    <div style={{ width: '250px', fontWeight: '500' }} className="text-truncate">
                      {nombre}
                    </div>
                    <div className="flex-grow-1" style={{ position: 'relative', height: '32px', backgroundColor: '#f3f4f6' }}>
                      {/* Barra */}
                      <div
                        className="gantt-bar"
                        style={{
                          position: 'absolute',
                          left: `${posicion}%`,
                          width: `${ancho}%`,
                          height: '24px',
                          backgroundColor: color,
                          borderRadius: '4px',
                          cursor: !proyectoSeleccionado ? 'pointer' : 'default',
                          top: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                        }}
                        onClick={() => {
                          if (!proyectoSeleccionado && item.nombre) {
                            onProyectoClick(item.nombre);
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.8';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title={`${nombre}\nInicio: ${format(new Date(item.inicio), 'dd/MM/yyyy')}\nFin: ${format(new Date(item.fin), 'dd/MM/yyyy')}\nEstado: ${item.estado}`}
                      >
                        {parseFloat(ancho) > 10 && item.estado}
                      </div>
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="d-flex justify-content-between text-muted small">
                    <span>
                      {format(new Date(item.inicio), 'dd/MM/yyyy')} - {format(new Date(item.fin), 'dd/MM/yyyy')}
                    </span>
                    <span className="badge" style={{ backgroundColor: color }}>
                      {item.estado}
                    </span>
                  </div>

                  {/* Métricas adicionales (solo en vista detallada) */}
                  {item.cpEjecutados !== undefined && (
                    <div className="mt-1 text-muted small">
                      <i className="fas fa-check-circle me-1"></i>
                      CP: {item.cpEjecutados} |
                      <i className="fas fa-bug ms-2 me-1"></i>
                      Issues: {item.totalIssues} |
                      <i className="fas fa-clock ms-2 me-1"></i>
                      Horas: {item.horas}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="mt-4 d-flex gap-4 justify-content-center">
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#10b981', borderRadius: '4px' }} className="me-2"></div>
              <small>{proyectoSeleccionado ? 'Terminado' : 'Concluido'}</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '4px' }} className="me-2"></div>
              <small>En Curso</small>
            </div>
            {proyectoSeleccionado && (
              <div className="d-flex align-items-center">
                <div style={{ width: '20px', height: '20px', backgroundColor: '#6b7280', borderRadius: '4px' }} className="me-2"></div>
                <small>Por Iniciar</small>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GanttSection;
