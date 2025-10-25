import * as XLSX from 'xlsx';

/**
 * Procesa un archivo Excel y devuelve los datos en formato JSON
 * @param {File} file - Archivo Excel a procesar
 * @returns {Promise<Object>} - Datos procesados del Excel
 */
export const processExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Obtener la primera hoja
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir a JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        resolve({
          sheetName: firstSheetName,
          data: jsonData,
          allSheets: workbook.SheetNames
        });
      } catch (error) {
        reject(new Error('Error al procesar el archivo Excel: ' + error.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Calcula métricas de testing a partir de los datos
 * @param {Array} data - Datos del Excel
 * @returns {Object} - Métricas calculadas
 */
export const calculateTestingMetrics = (data) => {
  if (!data || data.length === 0) {
    return {
      totalPruebas: 0,
      totalAprobadas: 0,
      totalFallidas: 0,
      totalPendientes: 0,
      tasaExito: 0,
      tiempoPromedio: 0
    };
  }

  const totales = data.reduce((acc, row) => {
    return {
      pruebas: acc.pruebas + (parseInt(row['Total Pruebas'] || row['TotalPruebas'] || 0)),
      aprobadas: acc.aprobadas + (parseInt(row['Aprobadas'] || row['Passed'] || 0)),
      fallidas: acc.fallidas + (parseInt(row['Fallidas'] || row['Failed'] || 0)),
      pendientes: acc.pendientes + (parseInt(row['Pendientes'] || row['Pending'] || 0)),
      tiempo: acc.tiempo + (parseFloat(row['Tiempo Promedio (min)'] || row['TiempoPromedio'] || 0))
    };
  }, { pruebas: 0, aprobadas: 0, fallidas: 0, pendientes: 0, tiempo: 0 });

  const tasaExito = totales.pruebas > 0
    ? ((totales.aprobadas / totales.pruebas) * 100).toFixed(2)
    : 0;

  const tiempoPromedio = data.length > 0
    ? (totales.tiempo / data.length).toFixed(2)
    : 0;

  return {
    totalPruebas: totales.pruebas,
    totalAprobadas: totales.aprobadas,
    totalFallidas: totales.fallidas,
    totalPendientes: totales.pendientes,
    tasaExito: parseFloat(tasaExito),
    tiempoPromedio: parseFloat(tiempoPromedio)
  };
};

/**
 * Prepara datos para gráficos
 * @param {Array} data - Datos del Excel
 * @returns {Object} - Datos formateados para Chart.js
 */
export const prepareChartData = (data) => {
  if (!data || data.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  const labels = data.map(row => row['Fecha'] || row['Date'] || '');

  const aprobadas = data.map(row => parseInt(row['Aprobadas'] || row['Passed'] || 0));
  const fallidas = data.map(row => parseInt(row['Fallidas'] || row['Failed'] || 0));
  const pendientes = data.map(row => parseInt(row['Pendientes'] || row['Pending'] || 0));

  return {
    labels,
    aprobadas,
    fallidas,
    pendientes
  };
};

/**
 * Valida que el archivo Excel tenga las columnas esperadas
 * @param {Array} data - Datos del Excel
 * @returns {Object} - Resultado de la validación
 */
export const validateExcelStructure = (data) => {
  if (!data || data.length === 0) {
    return {
      valid: false,
      message: 'El archivo está vacío'
    };
  }

  const firstRow = data[0];
  const expectedColumns = [
    'Fecha', 'Total Pruebas', 'Aprobadas', 'Fallidas', 'Pendientes'
  ];

  const hasRequiredColumns = expectedColumns.some(col =>
    Object.keys(firstRow).some(key =>
      key.toLowerCase().includes(col.toLowerCase().replace(' ', ''))
    )
  );

  if (!hasRequiredColumns) {
    return {
      valid: true, // Permitimos cualquier estructura, solo advertimos
      message: 'El archivo tiene una estructura diferente a la esperada, pero se procesará de todas formas.',
      warning: true
    };
  }

  return {
    valid: true,
    message: 'Estructura válida'
  };
};
