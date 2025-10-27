import * as XLSX from 'xlsx';
import { format, parseISO } from 'date-fns';

// Catálogo de actividades según especificaciones
const ACTIVIDADES = {
  SHIFT_LEFT: ['Analisis y Dimensionamiento', 'Diseño de escenarios'],
  DISENO: ['Diseño de escenarios'],
  DATOS_INSUMOS: ['Datos, Insumos y Ambientes'],
  CICLOS_QA: [
    'Pruebas QA Ciclo 1', 'Pruebas QA Ciclo 2', 'Pruebas QA Ciclo 3', 'Pruebas QA Ciclo 4',
    'Pruebas QA Ciclo 5', 'Pruebas QA Ciclo 6', 'Pruebas QA Ciclo 7', 'Pruebas QA Ciclo 8',
    'Pruebas QA Ciclo 9', 'Pruebas QA Ciclo 10', 'Pruebas QA Ciclo 11', 'Pruebas QA Ciclo 12',
    'Pruebas QA Ciclo 13', 'Pruebas QA Ciclo 14', 'Pruebas QA Ciclo 15'
  ],
  UAT: ['Pruebas UAT'],
  PREPRODUCTIVAS: ['Pruebas Preproductivas'],
  SMOKE: ['Smoke Productivo'],
  ESTABILIZACION: ['Estabilización Productiva'],
  RETRASOS: [
    'Retraso por definiciones Incompletas o Ambigüas',
    'Retraso po entrega tardía de desarrollo',
    'Retraso por indisponibilidad de ambientes',
    'Retraso por cambios en el alcance durante ciclo de pruebas',
    'Retraso por ineficiencias con el equipo de Pruebas'
  ]
};

// Actividades de ejecución (todos los ciclos QA + UAT + Preproductivas + Smoke + Estabilización)
const ACTIVIDADES_EJECUCION = [
  ...ACTIVIDADES.CICLOS_QA,
  ...ACTIVIDADES.UAT,
  ...ACTIVIDADES.PREPRODUCTIVAS,
  ...ACTIVIDADES.SMOKE,
  ...ACTIVIDADES.ESTABILIZACION
];

// Procesamiento del archivo Excel
export const processExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        // Asumiendo que los datos están en la primera hoja
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Normalizar los datos
        const normalizedData = normalizeData(jsonData);

        resolve(normalizedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Normalizar datos del Excel
const normalizeData = (data) => {
  return data.map(row => ({
    // Identificación y clasificación
    Cartera: row['Cartera'] || '',
    Subcartera: row['Subcartera'] || '',
    Proyecto: row['Proyecto'] || '',
    Actividad: row['Actividad'] || '',
    Estado: row['Estado'] || '',
    Año: parseInt(row['Año']) || new Date().getFullYear(),

    // Esfuerzo y tiempo
    Horas: parseFloat(row['Horas']) || 0,
    Dias: parseFloat(row['Dias']) || 0,

    // Fechas
    'F.inicio Plan': row['F.inicio Plan'],
    'F.inicio Real': row['F.inicio Real'],
    'F.Fin Plan': row['F.Fin Plan'],
    'F.Fin Real': row['F.Fin Real'],
    '% Efectividad': parseFloat(row['% Efectividad']) || 0,

    // Casos de Prueba
    'CP Nuevos': parseInt(row['CP Nuevos']) || 0,
    'CP Modificados': parseInt(row['CP Modificados']) || 0,
    'CP reutilizados': parseInt(row['CP reutilizados']) || 0,
    'CP Automatizados': parseInt(row['CP Automatizados']) || 0,
    'CP Ejecutados': parseInt(row['CP Ejecutados']) || 0,

    // Issues
    'Issues Bloqueantes': parseInt(row['Issues Bloqueantes']) || 0,
    'Issues Críticos': parseInt(row['Issues Críticos']) || 0,
    'Issues Altos': parseInt(row['Issues Altos']) || 0,
    'Issues Menores': parseInt(row['Issues Menores']) || 0,
    'Total de Issues no resueltos': parseInt(row['Total de Issues no resueltos']) || 0,

    // MTTR
    MTTR: parseFloat(row['MTTR']) || 0
  }));
};

// Aplicar filtros a los datos
export const applyFilters = (data, filters) => {
  return data.filter(row => {
    // Filtro de año
    if (filters.año && row.Año !== filters.año) return false;

    // Filtro de cartera
    if (filters.cartera && row.Cartera !== filters.cartera) return false;

    // Filtro de subcarteras (multi-select)
    if (filters.subcarteras && filters.subcarteras.length > 0) {
      if (!filters.subcarteras.includes(row.Subcartera)) return false;
    }

    // Filtro de proyectos (multi-select)
    if (filters.proyectos && filters.proyectos.length > 0) {
      if (!filters.proyectos.includes(row.Proyecto)) return false;
    }

    // Filtro de estados (multi-select)
    if (filters.estados && filters.estados.length > 0) {
      if (!filters.estados.includes(row.Estado)) return false;
    }

    return true;
  });
};

// Calcular estado del proyecto
export const calcularEstadoProyecto = (proyecto, data) => {
  const actividadesProyecto = data.filter(row => row.Proyecto === proyecto);

  // Si TODAS las actividades están "Terminado", el proyecto está "Concluido"
  const todasTerminadas = actividadesProyecto.every(row => row.Estado === 'Terminado');

  return todasTerminadas ? 'Concluido' : 'En Curso';
};

// CATEGORÍA 1: CASOS DE PRUEBA (6 KPIs)

// KPI 1: CP Diseñados
export const calcularCPDiseñados = (data) => {
  return data
    .filter(row => row.Actividad === 'Diseño de escenarios')
    .reduce((sum, row) => sum + row['CP Nuevos'] + row['CP Modificados'], 0);
};

// KPI 2: CP Nuevos
export const calcularCPNuevos = (data) => {
  return data
    .filter(row => row.Actividad === 'Diseño de escenarios')
    .reduce((sum, row) => sum + row['CP Nuevos'], 0);
};

// KPI 3: CP Modificados
export const calcularCPModificados = (data) => {
  return data
    .filter(row => row.Actividad === 'Diseño de escenarios')
    .reduce((sum, row) => sum + row['CP Modificados'], 0);
};

// KPI 4: CP Reutilizados
export const calcularCPReutilizados = (data) => {
  return data
    .filter(row => row.Actividad === 'Diseño de escenarios')
    .reduce((sum, row) => sum + row['CP reutilizados'], 0);
};

// KPI 5: CP Automatizados
export const calcularCPAutomatizados = (data) => {
  return data
    .filter(row => row.Actividad === 'Diseño de escenarios')
    .reduce((sum, row) => sum + row['CP Automatizados'], 0);
};

// KPI 6: CP Ejecutados
export const calcularCPEjecutados = (data) => {
  return data
    .filter(row => ACTIVIDADES_EJECUCION.includes(row.Actividad))
    .reduce((sum, row) => sum + row['CP Ejecutados'], 0);
};

// CATEGORÍA 2: DEFECTOS (9 KPIs)

// KPI 7: Total Issues Shift Left
export const calcularIssuesShiftLeft = (data) => {
  return data
    .filter(row => ACTIVIDADES.SHIFT_LEFT.includes(row.Actividad))
    .reduce((sum, row) =>
      sum + row['Issues Bloqueantes'] + row['Issues Críticos'] +
      row['Issues Altos'] + row['Issues Menores'], 0);
};

// KPI 8: Total Issues Ejecución
export const calcularIssuesEjecucion = (data) => {
  return data
    .filter(row => ACTIVIDADES_EJECUCION.includes(row.Actividad))
    .reduce((sum, row) =>
      sum + row['Issues Bloqueantes'] + row['Issues Críticos'] +
      row['Issues Altos'] + row['Issues Menores'], 0);
};

// KPI 9: Total Issues
export const calcularTotalIssues = (data) => {
  return calcularIssuesShiftLeft(data) + calcularIssuesEjecucion(data);
};

// KPI 10: Issues No Resueltos
export const calcularIssuesNoResueltos = (data) => {
  return data.reduce((sum, row) => sum + row['Total de Issues no resueltos'], 0);
};

// KPI 11: Issues por Severidad - Shift Left
export const calcularIssuesPorSeveridadShiftLeft = (data) => {
  const filteredData = data.filter(row => ACTIVIDADES.SHIFT_LEFT.includes(row.Actividad));
  return {
    bloqueantes: filteredData.reduce((sum, row) => sum + row['Issues Bloqueantes'], 0),
    criticos: filteredData.reduce((sum, row) => sum + row['Issues Críticos'], 0),
    altos: filteredData.reduce((sum, row) => sum + row['Issues Altos'], 0),
    menores: filteredData.reduce((sum, row) => sum + row['Issues Menores'], 0)
  };
};

// KPI 12: Issues por Severidad - Ejecución
export const calcularIssuesPorSeveridadEjecucion = (data) => {
  const filteredData = data.filter(row => ACTIVIDADES_EJECUCION.includes(row.Actividad));
  return {
    bloqueantes: filteredData.reduce((sum, row) => sum + row['Issues Bloqueantes'], 0),
    criticos: filteredData.reduce((sum, row) => sum + row['Issues Críticos'], 0),
    altos: filteredData.reduce((sum, row) => sum + row['Issues Altos'], 0),
    menores: filteredData.reduce((sum, row) => sum + row['Issues Menores'], 0)
  };
};

// KPI 13: Escape Rate UAT
export const calcularEscapeRateUAT = (data) => {
  const issuesUAT = data
    .filter(row => ACTIVIDADES.UAT.includes(row.Actividad))
    .reduce((sum, row) =>
      sum + row['Issues Bloqueantes'] + row['Issues Críticos'] +
      row['Issues Altos'] + row['Issues Menores'], 0);

  const issuesCiclosQA = data
    .filter(row => ACTIVIDADES.CICLOS_QA.includes(row.Actividad))
    .reduce((sum, row) =>
      sum + row['Issues Bloqueantes'] + row['Issues Críticos'] +
      row['Issues Altos'] + row['Issues Menores'], 0);

  if (issuesCiclosQA === 0) return 0;
  return ((issuesUAT / issuesCiclosQA) * 100).toFixed(2);
};

// KPI 14: Escape Rate Productivo
export const calcularEscapeRateProductivo = (data) => {
  const issuesProductivo = data
    .filter(row => row.Actividad === 'Estabilización Productiva')
    .reduce((sum, row) =>
      sum + row['Issues Bloqueantes'] + row['Issues Críticos'] +
      row['Issues Altos'] + row['Issues Menores'], 0);

  const totalIssuesEjecucion = calcularIssuesEjecucion(data);

  if (totalIssuesEjecucion === 0) return 0;
  return ((issuesProductivo / totalIssuesEjecucion) * 100).toFixed(2);
};

// KPI 15: MTTR Promedio
export const calcularMTTRPromedio = (data) => {
  const dataConMTTR = data.filter(row => row.MTTR > 0);
  if (dataConMTTR.length === 0) return 0;

  const sumMTTR = dataConMTTR.reduce((sum, row) => sum + row.MTTR, 0);
  return (sumMTTR / dataConMTTR.length).toFixed(2);
};

// CATEGORÍA 3: EFECTIVIDAD (4 KPIs)

// KPI 16: % Efectividad Ciclo 1
export const calcularEfectividadCiclo1 = (data) => {
  const datosCiclo1 = data.filter(row => row.Actividad === 'Pruebas QA Ciclo 1');
  if (datosCiclo1.length === 0) return 0;

  const sumEfectividad = datosCiclo1.reduce((sum, row) => sum + row['% Efectividad'], 0);
  return (sumEfectividad / datosCiclo1.length).toFixed(2);
};

// KPI 17: % Efectividad Ciclos QA
export const calcularEfectividadCiclosQA = (data) => {
  const datosCiclosQA = data.filter(row => ACTIVIDADES.CICLOS_QA.includes(row.Actividad));
  if (datosCiclosQA.length === 0) return 0;

  const sumEfectividad = datosCiclosQA.reduce((sum, row) => sum + row['% Efectividad'], 0);
  return (sumEfectividad / datosCiclosQA.length).toFixed(2);
};

// KPI 18: % Efectividad UAT
export const calcularEfectividadUAT = (data) => {
  const datosUAT = data.filter(row => ACTIVIDADES.UAT.includes(row.Actividad));
  if (datosUAT.length === 0) return 0;

  const sumEfectividad = datosUAT.reduce((sum, row) => sum + row['% Efectividad'], 0);
  return (sumEfectividad / datosUAT.length).toFixed(2);
};

// KPI 19: % Efectividad Ejecución
export const calcularEfectividadEjecucion = (data) => {
  const datosEjecucion = data.filter(row => ACTIVIDADES_EJECUCION.includes(row.Actividad));
  if (datosEjecucion.length === 0) return 0;

  const sumEfectividad = datosEjecucion.reduce((sum, row) => sum + row['% Efectividad'], 0);
  return (sumEfectividad / datosEjecucion.length).toFixed(2);
};

// CATEGORÍA 4: DESVIACIONES (2 KPIs)

// KPI 20: Horas Desviación Total
export const calcularHorasDesviacion = (data) => {
  return data
    .filter(row => ACTIVIDADES.RETRASOS.includes(row.Actividad))
    .reduce((sum, row) => sum + row.Horas, 0);
};

// KPI 21: Horas Desviación por Proyecto
export const calcularHorasDesviacionPorProyecto = (data) => {
  const desviaciones = {};

  data
    .filter(row => ACTIVIDADES.RETRASOS.includes(row.Actividad))
    .forEach(row => {
      if (!desviaciones[row.Proyecto]) {
        desviaciones[row.Proyecto] = 0;
      }
      desviaciones[row.Proyecto] += row.Horas;
    });

  // Convertir a array y ordenar descendente
  return Object.entries(desviaciones)
    .map(([proyecto, horas]) => ({ proyecto, horas }))
    .sort((a, b) => b.horas - a.horas)
    .slice(0, 10); // Top 10
};

// Calcular todos los KPIs
export const calcularTodosLosKPIs = (data) => {
  return {
    // Casos de Prueba
    cpDiseñados: calcularCPDiseñados(data),
    cpNuevos: calcularCPNuevos(data),
    cpModificados: calcularCPModificados(data),
    cpReutilizados: calcularCPReutilizados(data),
    cpAutomatizados: calcularCPAutomatizados(data),
    cpEjecutados: calcularCPEjecutados(data),

    // Defectos
    issuesShiftLeft: calcularIssuesShiftLeft(data),
    issuesEjecucion: calcularIssuesEjecucion(data),
    totalIssues: calcularTotalIssues(data),
    issuesNoResueltos: calcularIssuesNoResueltos(data),
    issuesPorSeveridadShiftLeft: calcularIssuesPorSeveridadShiftLeft(data),
    issuesPorSeveridadEjecucion: calcularIssuesPorSeveridadEjecucion(data),
    escapeRateUAT: parseFloat(calcularEscapeRateUAT(data)),
    escapeRateProductivo: parseFloat(calcularEscapeRateProductivo(data)),
    mttrPromedio: parseFloat(calcularMTTRPromedio(data)),

    // Efectividad
    efectividadCiclo1: parseFloat(calcularEfectividadCiclo1(data)),
    efectividadCiclosQA: parseFloat(calcularEfectividadCiclosQA(data)),
    efectividadUAT: parseFloat(calcularEfectividadUAT(data)),
    efectividadEjecucion: parseFloat(calcularEfectividadEjecucion(data)),

    // Desviaciones
    horasDesviacion: calcularHorasDesviacion(data),
    horasDesviacionPorProyecto: calcularHorasDesviacionPorProyecto(data)
  };
};

// Preparar datos para tendencias mensuales
export const prepararDatosMensuales = (data) => {
  const datosPorMes = {};

  data.forEach(row => {
    if (!row['F.Fin Real']) return;

    try {
      const fecha = typeof row['F.Fin Real'] === 'string'
        ? parseISO(row['F.Fin Real'])
        : row['F.Fin Real'];

      const mes = format(fecha, 'yyyy-MM');

      if (!datosPorMes[mes]) {
        datosPorMes[mes] = [];
      }

      datosPorMes[mes].push(row);
    } catch (error) {
      console.warn('Error procesando fecha:', row['F.Fin Real']);
    }
  });

  // Calcular KPIs por mes
  const tendencias = Object.entries(datosPorMes)
    .map(([mes, datos]) => ({
      mes,
      ...calcularTodosLosKPIs(datos)
    }))
    .sort((a, b) => a.mes.localeCompare(b.mes));

  return tendencias;
};

// Preparar datos para Gantt
export const prepararDatosGantt = (data, proyectoSeleccionado = null) => {
  if (proyectoSeleccionado) {
    // Vista Detallada: Actividades del proyecto
    return data
      .filter(row =>
        row.Proyecto === proyectoSeleccionado &&
        (row['F.inicio Real'] || row['F.Fin Real'])
      )
      .map(row => ({
        actividad: row.Actividad,
        estado: row.Estado,
        inicio: row['F.inicio Real'] || row['F.Fin Real'],
        fin: row['F.Fin Real'] || row['F.inicio Real'],
        cpEjecutados: row['CP Ejecutados'],
        totalIssues: row['Issues Bloqueantes'] + row['Issues Críticos'] +
                     row['Issues Altos'] + row['Issues Menores'],
        horas: row.Horas
      }));
  } else {
    // Vista General: Proyectos
    const proyectos = {};

    data.forEach(row => {
      if (!proyectos[row.Proyecto]) {
        proyectos[row.Proyecto] = {
          nombre: row.Proyecto,
          cartera: row.Cartera,
          fechas: []
        };
      }

      if (row['F.inicio Real']) proyectos[row.Proyecto].fechas.push(new Date(row['F.inicio Real']));
      if (row['F.Fin Real']) proyectos[row.Proyecto].fechas.push(new Date(row['F.Fin Real']));
    });

    return Object.values(proyectos)
      .filter(p => p.fechas.length > 0)
      .map(p => ({
        nombre: p.nombre,
        cartera: p.cartera,
        estado: calcularEstadoProyecto(p.nombre, data),
        inicio: new Date(Math.min(...p.fechas)),
        fin: new Date(Math.max(...p.fechas))
      }));
  }
};

// Obtener opciones únicas para filtros
export const obtenerOpcionesFiltros = (data) => {
  return {
    años: [...new Set(data.map(row => row.Año))].sort(),
    carteras: [...new Set(data.map(row => row.Cartera))].filter(Boolean).sort(),
    subcarteras: [...new Set(data.map(row => row.Subcartera))].filter(Boolean).sort(),
    proyectos: [...new Set(data.map(row => row.Proyecto))].filter(Boolean).sort(),
    estados: ['Terminado', 'En curso', 'Por iniciar']
  };
};
