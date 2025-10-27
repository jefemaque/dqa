/**
 * Utilidades para formateo de datos en el dashboard QA
 * v2.1 - Incluye meses en español y formato de números
 */

// Meses en español (3 letras mayúsculas)
export const MESES_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
                         'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

/**
 * Convierte un mes en formato YYYY-MM a nombre corto en español
 * @param {string} mesISO - Mes en formato "2025-01" o "01"
 * @returns {string} - Nombre del mes en español (ej: "ENE")
 */
export const formatearMesEspañol = (mesISO) => {
  if (!mesISO) return '';

  // Si viene en formato YYYY-MM
  if (mesISO.includes('-')) {
    const partes = mesISO.split('-');
    const mesNumero = parseInt(partes[1]) - 1; // 0-indexed
    return MESES_ES[mesNumero] || mesISO;
  }

  // Si viene solo el número del mes
  const mesNumero = parseInt(mesISO) - 1;
  return MESES_ES[mesNumero] || mesISO;
};

/**
 * Formatea un número sin decimales con separador de miles
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado (ej: "1,250")
 */
export const formatearNumeroCP = (numero) => {
  if (numero === null || numero === undefined) return '0';
  return Math.floor(numero).toLocaleString('es-ES');
};

/**
 * Formatea un número con 2 decimales
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado (ej: "12.50")
 */
export const formatearNumeroDecimal = (numero) => {
  if (numero === null || numero === undefined) return '0.00';
  return parseFloat(numero).toFixed(2);
};

/**
 * Formatea un porcentaje
 * @param {number} valor - Valor del porcentaje
 * @returns {string} - Porcentaje formateado (ej: "85.5%")
 */
export const formatearPorcentaje = (valor) => {
  if (valor === null || valor === undefined) return '0%';
  return `${parseFloat(valor).toFixed(1)}%`;
};

/**
 * Genera array con los 12 meses del año en español
 * @returns {Array} - Array de objetos con mes y valor inicial en 0
 */
export const generarMesesCompletos = () => {
  return MESES_ES.map(mes => ({
    mes: mes,
    valor: 0
  }));
};

/**
 * Obtiene el semáforo (color) según el valor de efectividad
 * @param {number} valor - Porcentaje de efectividad
 * @returns {string} - Color del semáforo
 */
export const getSemaforoEfectividad = (valor) => {
  if (valor >= 90) return '#10b981'; // 🟢 Verde
  if (valor >= 70) return '#f59e0b'; // 🟡 Amarillo
  return '#ef4444'; // 🔴 Rojo
};

/**
 * Obtiene el semáforo para Escape Rate UAT
 * @param {number} valor - Porcentaje de escape rate
 * @returns {string} - Color del semáforo
 */
export const getSemaforoEscapeRateUAT = (valor) => {
  if (valor < 5) return '#10b981'; // 🟢 Verde
  if (valor <= 10) return '#f59e0b'; // 🟡 Amarillo
  return '#ef4444'; // 🔴 Rojo
};

/**
 * Obtiene el semáforo para Escape Rate Productivo
 * @param {number} valor - Porcentaje de escape rate
 * @returns {string} - Color del semáforo
 */
export const getSemaforoEscapeRateProductivo = (valor) => {
  if (valor < 2) return '#10b981'; // 🟢 Verde
  if (valor <= 5) return '#f59e0b'; // 🟡 Amarillo
  return '#ef4444'; // 🔴 Rojo
};

/**
 * Obtiene el semáforo para MTTR
 * @param {number} valor - Días de MTTR
 * @returns {string} - Color del semáforo
 */
export const getSemaforoMTTR = (valor) => {
  if (valor < 3) return '#10b981'; // 🟢 Verde
  if (valor <= 5) return '#f59e0b'; // 🟡 Amarillo
  return '#ef4444'; // 🔴 Rojo
};

/**
 * Colores para composición de desviaciones
 */
export const COLORES_DESVIACIONES = {
  'definiciones Incompletas o Ambigüas': '#dc2626',
  'entrega tardía de desarrollo': '#ef4444',
  'indisponibilidad de ambientes': '#f59e0b',
  'cambios en el alcance': '#fb923c',
  'ineficiencias con el equipo': '#fca5a5'
};

/**
 * Colores para issues por severidad
 */
export const COLORES_SEVERIDAD = {
  bloqueantes: '#991b1b',
  criticos: '#ef4444',
  altos: '#f59e0b',
  menores: '#a3e635'
};
