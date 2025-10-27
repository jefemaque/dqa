import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import QAFilters from './QAFilters';
import ExcelUploaderQA from './ExcelUploaderQA';
import CasosPruebaSection from './CasosPruebaSection';
import DefectosSection from './DefectosSection';
import EfectividadSection from './EfectividadSection';
import DesviacionesSection from './DesviacionesSection';
import TendenciasSection from './TendenciasSection';
import GanttSection from './GanttSection';
import {
  processExcelFile,
  applyFilters,
  calcularTodosLosKPIs,
  prepararDatosMensuales,
  prepararDatosGantt,
  obtenerOpcionesFiltros
} from '../../utils/qaExcelProcessor';

const QADashboard = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [tendenciasMensuales, setTendenciasMensuales] = useState([]);
  const [datosGantt, setDatosGantt] = useState([]);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    años: [],
    carteras: [],
    subcarteras: [],
    proyectos: [],
    estados: []
  });

  const [filters, setFilters] = useState({
    año: null,
    cartera: '',
    subcarteras: [],
    proyectos: [],
    estados: ['Terminado', 'En curso', 'Por iniciar']
  });

  // Cargar datos desde Excel
  const handleFileUpload = async (file) => {
    try {
      const data = await processExcelFile(file);
      setRawData(data);

      // Obtener opciones para filtros
      const opciones = obtenerOpcionesFiltros(data);
      setOpcionesFiltros(opciones);

      // Establecer año actual por defecto
      const añoActual = new Date().getFullYear();
      setFilters(prev => ({
        ...prev,
        año: añoActual
      }));

    } catch (error) {
      console.error('Error procesando archivo:', error);
      alert('Error al procesar el archivo Excel. Verifica que tenga el formato correcto.');
    }
  };

  // Aplicar filtros cuando cambien los datos o filtros
  useEffect(() => {
    if (rawData.length === 0) return;

    const datosFiltrados = applyFilters(rawData, filters);
    setFilteredData(datosFiltrados);

    // Calcular KPIs
    const kpisCalculados = calcularTodosLosKPIs(datosFiltrados);
    setKpis(kpisCalculados);

    // Preparar tendencias mensuales
    const tendencias = prepararDatosMensuales(datosFiltrados);
    setTendenciasMensuales(tendencias);

    // Preparar datos Gantt
    const proyectoSeleccionado = filters.proyectos.length === 1 ? filters.proyectos[0] : null;
    const gantt = prepararDatosGantt(datosFiltrados, proyectoSeleccionado);
    setDatosGantt(gantt);

  }, [rawData, filters]);

  // Actualizar filtros
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const hasData = rawData.length > 0;

  return (
    <div className="qa-dashboard">
      {/* Header */}
      <div className="dashboard-header bg-white shadow-sm mb-4">
        <Container>
          <div className="py-4">
            <h1 className="mb-2">
              <i className="fas fa-chart-line me-3 text-primary"></i>
              Dashboard QA - Métricas de Calidad
            </h1>
            <p className="text-muted mb-0">
              Monitor y análisis de resultados de pruebas de software
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Excel Uploader */}
        <ExcelUploaderQA onFileUpload={handleFileUpload} />

        {/* Filtros Globales */}
        {hasData && (
          <QAFilters
            filters={filters}
            opciones={opcionesFiltros}
            onFilterChange={handleFilterChange}
            rawData={rawData}
          />
        )}

        {/* Secciones del Dashboard */}
        {hasData && kpis && (
          <>
            {/* Sección 1: Casos de Prueba */}
            <CasosPruebaSection
              kpis={kpis}
              tendencias={tendenciasMensuales}
            />

            {/* Sección 2: Defectos */}
            <DefectosSection
              kpis={kpis}
              tendencias={tendenciasMensuales}
            />

            {/* Sección 3: Efectividad */}
            <EfectividadSection
              kpis={kpis}
              tendencias={tendenciasMensuales}
            />

            {/* Sección 4: Desviaciones */}
            <DesviacionesSection
              kpis={kpis}
            />

            {/* Sección 5: Tendencias Mensuales */}
            <TendenciasSection
              tendencias={tendenciasMensuales}
            />

            {/* Sección 6: Gantt */}
            <GanttSection
              datos={datosGantt}
              proyectoSeleccionado={filters.proyectos.length === 1 ? filters.proyectos[0] : null}
              onProyectoClick={(proyecto) => {
                setFilters(prev => ({
                  ...prev,
                  proyectos: [proyecto]
                }));
              }}
              onVolverClick={() => {
                setFilters(prev => ({
                  ...prev,
                  proyectos: []
                }));
              }}
            />
          </>
        )}

        {/* Mensaje cuando no hay datos */}
        {!hasData && (
          <div className="text-center py-5">
            <i className="fas fa-file-excel fa-4x text-muted mb-4" style={{ opacity: 0.3 }}></i>
            <h4 className="text-muted">No hay datos cargados</h4>
            <p className="text-muted">
              Carga un archivo Excel con las métricas de QA para visualizar el dashboard
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default QADashboard;
