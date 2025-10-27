// Estado global de la aplicación
let rawData = [];
let filteredData = [];
let charts = {};

// Catálogos de actividades
const ACTIVIDADES = {
    SHIFT_LEFT: ['Analisis y Dimensionamiento', 'Diseño de escenarios'],
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

// Actividades de ejecución
const ACTIVIDADES_EJECUCION = [
    ...ACTIVIDADES.CICLOS_QA,
    ...ACTIVIDADES.UAT,
    ...ACTIVIDADES.PREPRODUCTIVAS,
    ...ACTIVIDADES.SMOKE,
    ...ACTIVIDADES.ESTABILIZACION
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    // Click para seleccionar archivo
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) processExcelFile(file);
    });

    // Cambio de archivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) processExcelFile(file);
    });

    // Filtros
    document.getElementById('filterAnio').addEventListener('change', applyFilters);
    document.getElementById('filterCartera').addEventListener('change', applyFilters);
    document.getElementById('filterProyecto').addEventListener('change', applyFilters);
    document.getElementById('estadoTerminado').addEventListener('change', applyFilters);
    document.getElementById('estadoEnCurso').addEventListener('change', applyFilters);
    document.getElementById('estadoPorIniciar').addEventListener('change', applyFilters);
    document.getElementById('btnResetFilters').addEventListener('click', resetFilters);
}

// Procesar archivo Excel
function processExcelFile(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true });

            // Leer primera hoja
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            // Normalizar datos
            rawData = normalizeData(jsonData);
            filteredData = rawData;

            // Poblar filtros
            populateFilters();

            // Mostrar dashboard
            document.getElementById('uploadSection').classList.add('hidden');
            document.getElementById('filtersPanel').classList.remove('hidden');
            document.getElementById('dashboardContent').classList.remove('hidden');

            // Renderizar dashboard
            renderDashboard();

        } catch (error) {
            console.error('Error procesando archivo:', error);
            alert('Error al procesar el archivo Excel. Verifica que tenga el formato correcto.');
        }
    };

    reader.readAsArrayBuffer(file);
}

// Normalizar datos del Excel
function normalizeData(data) {
    return data.map(row => ({
        Cartera: row['Cartera'] || '',
        Subcartera: row['Subcartera'] || '',
        Proyecto: row['Proyecto'] || '',
        Actividad: row['Actividad'] || '',
        Estado: row['Estado'] || '',
        Año: parseInt(row['Año']) || new Date().getFullYear(),
        Horas: parseFloat(row['Horas']) || 0,
        Dias: parseFloat(row['Dias']) || 0,
        'F.inicio Plan': row['F.inicio Plan'],
        'F.inicio Real': row['F.inicio Real'],
        'F.Fin Plan': row['F.Fin Plan'],
        'F.Fin Real': row['F.Fin Real'],
        '% Efectividad': parseFloat(row['% Efectividad']) || 0,
        'CP Nuevos': parseInt(row['CP Nuevos']) || 0,
        'CP Modificados': parseInt(row['CP Modificados']) || 0,
        'CP reutilizados': parseInt(row['CP reutilizados']) || 0,
        'CP Automatizados': parseInt(row['CP Automatizados']) || 0,
        'CP Ejecutados': parseInt(row['CP Ejecutados']) || 0,
        'Issues Bloqueantes': parseInt(row['Issues Bloqueantes']) || 0,
        'Issues Críticos': parseInt(row['Issues Críticos']) || 0,
        'Issues Altos': parseInt(row['Issues Altos']) || 0,
        'Issues Menores': parseInt(row['Issues Menores']) || 0,
        'Total de Issues no resueltos': parseInt(row['Total de Issues no resueltos']) || 0,
        MTTR: parseFloat(row['MTTR']) || 0
    }));
}

// Poblar filtros
function populateFilters() {
    const años = [...new Set(rawData.map(r => r.Año))].sort();
    const carteras = [...new Set(rawData.map(r => r.Cartera))].filter(Boolean).sort();
    const proyectos = [...new Set(rawData.map(r => r.Proyecto))].filter(Boolean).sort();

    const filterAnio = document.getElementById('filterAnio');
    const filterCartera = document.getElementById('filterCartera');
    const filterProyecto = document.getElementById('filterProyecto');

    filterAnio.innerHTML = '<option value="">Todos</option>';
    años.forEach(año => {
        const option = document.createElement('option');
        option.value = año;
        option.textContent = año;
        if (año === new Date().getFullYear()) option.selected = true;
        filterAnio.appendChild(option);
    });

    filterCartera.innerHTML = '<option value="">Todas</option>';
    carteras.forEach(cartera => {
        const option = document.createElement('option');
        option.value = cartera;
        option.textContent = cartera;
        filterCartera.appendChild(option);
    });

    filterProyecto.innerHTML = '';
    proyectos.forEach(proyecto => {
        const option = document.createElement('option');
        option.value = proyecto;
        option.textContent = proyecto;
        option.selected = true;
        filterProyecto.appendChild(option);
    });
}

// Aplicar filtros
function applyFilters() {
    const año = document.getElementById('filterAnio').value;
    const cartera = document.getElementById('filterCartera').value;
    const proyectosSeleccionados = Array.from(document.getElementById('filterProyecto').selectedOptions).map(o => o.value);
    const estados = [];
    if (document.getElementById('estadoTerminado').checked) estados.push('Terminado');
    if (document.getElementById('estadoEnCurso').checked) estados.push('En curso');
    if (document.getElementById('estadoPorIniciar').checked) estados.push('Por iniciar');

    filteredData = rawData.filter(row => {
        if (año && row.Año !== parseInt(año)) return false;
        if (cartera && row.Cartera !== cartera) return false;
        if (proyectosSeleccionados.length > 0 && !proyectosSeleccionados.includes(row.Proyecto)) return false;
        if (estados.length > 0 && !estados.includes(row.Estado)) return false;
        return true;
    });

    renderDashboard();
}

// Resetear filtros
function resetFilters() {
    document.getElementById('filterAnio').value = new Date().getFullYear();
    document.getElementById('filterCartera').value = '';
    const proyectos = document.getElementById('filterProyecto').options;
    for (let i = 0; i < proyectos.length; i++) {
        proyectos[i].selected = true;
    }
    document.getElementById('estadoTerminado').checked = true;
    document.getElementById('estadoEnCurso').checked = true;
    document.getElementById('estadoPorIniciar').checked = true;
    applyFilters();
}

// Renderizar dashboard completo
function renderDashboard() {
    const kpis = calcularTodosLosKPIs(filteredData);
    renderCasosPruebaKPIs(kpis);
    renderDefectosKPIs(kpis);
    renderEfectividadKPIs(kpis);
    renderDesviacionesKPIs(kpis);
    renderCharts(filteredData, kpis);
}

// Calcular todos los KPIs
function calcularTodosLosKPIs(data) {
    return {
        cpDiseñados: calcularCPDiseñados(data),
        cpNuevos: calcularCPNuevos(data),
        cpModificados: calcularCPModificados(data),
        cpReutilizados: calcularCPReutilizados(data),
        cpAutomatizados: calcularCPAutomatizados(data),
        cpEjecutados: calcularCPEjecutados(data),
        issuesShiftLeft: calcularIssuesShiftLeft(data),
        issuesEjecucion: calcularIssuesEjecucion(data),
        totalIssues: calcularTotalIssues(data),
        issuesNoResueltos: calcularIssuesNoResueltos(data),
        escapeRateUAT: calcularEscapeRateUAT(data),
        escapeRateProductivo: calcularEscapeRateProductivo(data),
        mttrPromedio: calcularMTTRPromedio(data),
        efectividadCiclo1: calcularEfectividadCiclo1(data),
        efectividadCiclosQA: calcularEfectividadCiclosQA(data),
        efectividadUAT: calcularEfectividadUAT(data),
        efectividadEjecucion: calcularEfectividadEjecucion(data),
        horasDesviacion: calcularHorasDesviacion(data),
        horasDesviacionPorProyecto: calcularHorasDesviacionPorProyecto(data)
    };
}

// KPIs de Casos de Prueba
function calcularCPDiseñados(data) {
    return data.filter(r => r.Actividad === 'Diseño de escenarios')
        .reduce((sum, r) => sum + r['CP Nuevos'] + r['CP Modificados'], 0);
}

function calcularCPNuevos(data) {
    return data.filter(r => r.Actividad === 'Diseño de escenarios')
        .reduce((sum, r) => sum + r['CP Nuevos'], 0);
}

function calcularCPModificados(data) {
    return data.filter(r => r.Actividad === 'Diseño de escenarios')
        .reduce((sum, r) => sum + r['CP Modificados'], 0);
}

function calcularCPReutilizados(data) {
    return data.filter(r => r.Actividad === 'Diseño de escenarios')
        .reduce((sum, r) => sum + r['CP reutilizados'], 0);
}

function calcularCPAutomatizados(data) {
    return data.filter(r => r.Actividad === 'Diseño de escenarios')
        .reduce((sum, r) => sum + r['CP Automatizados'], 0);
}

function calcularCPEjecutados(data) {
    return data.filter(r => ACTIVIDADES_EJECUCION.includes(r.Actividad))
        .reduce((sum, r) => sum + r['CP Ejecutados'], 0);
}

// KPIs de Defectos
function calcularIssuesShiftLeft(data) {
    return data.filter(r => ACTIVIDADES.SHIFT_LEFT.includes(r.Actividad))
        .reduce((sum, r) => sum + r['Issues Bloqueantes'] + r['Issues Críticos'] + r['Issues Altos'] + r['Issues Menores'], 0);
}

function calcularIssuesEjecucion(data) {
    return data.filter(r => ACTIVIDADES_EJECUCION.includes(r.Actividad))
        .reduce((sum, r) => sum + r['Issues Bloqueantes'] + r['Issues Críticos'] + r['Issues Altos'] + r['Issues Menores'], 0);
}

function calcularTotalIssues(data) {
    return calcularIssuesShiftLeft(data) + calcularIssuesEjecucion(data);
}

function calcularIssuesNoResueltos(data) {
    return data.reduce((sum, r) => sum + r['Total de Issues no resueltos'], 0);
}

function calcularEscapeRateUAT(data) {
    const issuesUAT = data.filter(r => ACTIVIDADES.UAT.includes(r.Actividad))
        .reduce((sum, r) => sum + r['Issues Bloqueantes'] + r['Issues Críticos'] + r['Issues Altos'] + r['Issues Menores'], 0);
    const issuesCiclosQA = data.filter(r => ACTIVIDADES.CICLOS_QA.includes(r.Actividad))
        .reduce((sum, r) => sum + r['Issues Bloqueantes'] + r['Issues Críticos'] + r['Issues Altos'] + r['Issues Menores'], 0);
    return issuesCiclosQA === 0 ? 0 : ((issuesUAT / issuesCiclosQA) * 100).toFixed(2);
}

function calcularEscapeRateProductivo(data) {
    const issuesProductivo = data.filter(r => r.Actividad === 'Estabilización Productiva')
        .reduce((sum, r) => sum + r['Issues Bloqueantes'] + r['Issues Críticos'] + r['Issues Altos'] + r['Issues Menores'], 0);
    const totalIssuesEjecucion = calcularIssuesEjecucion(data);
    return totalIssuesEjecucion === 0 ? 0 : ((issuesProductivo / totalIssuesEjecucion) * 100).toFixed(2);
}

function calcularMTTRPromedio(data) {
    const dataConMTTR = data.filter(r => r.MTTR > 0);
    if (dataConMTTR.length === 0) return 0;
    return (dataConMTTR.reduce((sum, r) => sum + r.MTTR, 0) / dataConMTTR.length).toFixed(2);
}

// KPIs de Efectividad
function calcularEfectividadCiclo1(data) {
    const datos = data.filter(r => r.Actividad === 'Pruebas QA Ciclo 1');
    if (datos.length === 0) return 0;
    return (datos.reduce((sum, r) => sum + r['% Efectividad'], 0) / datos.length).toFixed(2);
}

function calcularEfectividadCiclosQA(data) {
    const datos = data.filter(r => ACTIVIDADES.CICLOS_QA.includes(r.Actividad));
    if (datos.length === 0) return 0;
    return (datos.reduce((sum, r) => sum + r['% Efectividad'], 0) / datos.length).toFixed(2);
}

function calcularEfectividadUAT(data) {
    const datos = data.filter(r => ACTIVIDADES.UAT.includes(r.Actividad));
    if (datos.length === 0) return 0;
    return (datos.reduce((sum, r) => sum + r['% Efectividad'], 0) / datos.length).toFixed(2);
}

function calcularEfectividadEjecucion(data) {
    const datos = data.filter(r => ACTIVIDADES_EJECUCION.includes(r.Actividad));
    if (datos.length === 0) return 0;
    return (datos.reduce((sum, r) => sum + r['% Efectividad'], 0) / datos.length).toFixed(2);
}

// KPIs de Desviaciones
function calcularHorasDesviacion(data) {
    return data.filter(r => ACTIVIDADES.RETRASOS.includes(r.Actividad))
        .reduce((sum, r) => sum + r.Horas, 0);
}

function calcularHorasDesviacionPorProyecto(data) {
    const desviaciones = {};
    data.filter(r => ACTIVIDADES.RETRASOS.includes(r.Actividad))
        .forEach(r => {
            if (!desviaciones[r.Proyecto]) desviaciones[r.Proyecto] = 0;
            desviaciones[r.Proyecto] += r.Horas;
        });
    return Object.entries(desviaciones)
        .map(([proyecto, horas]) => ({ proyecto, horas }))
        .sort((a, b) => b.horas - a.horas)
        .slice(0, 10);
}

// Renderizar KPIs de Casos de Prueba
function renderCasosPruebaKPIs(kpis) {
    const container = document.getElementById('casosPruebaKPIs');
    container.innerHTML = `
        ${createKPICard('CP Diseñados', kpis.cpDiseñados, 'fas fa-pencil-alt', '#10b981')}
        ${createKPICard('CP Nuevos', kpis.cpNuevos, 'fas fa-plus-circle', '#3b82f6')}
        ${createKPICard('CP Modificados', kpis.cpModificados, 'fas fa-edit', '#06b6d4')}
        ${createKPICard('CP Reutilizados', kpis.cpReutilizados, 'fas fa-recycle', '#6b7280')}
        ${createKPICard('CP Automatizados', kpis.cpAutomatizados, 'fas fa-robot', '#8b5cf6')}
        ${createKPICard('CP Ejecutados', kpis.cpEjecutados, 'fas fa-check-circle', '#1e40af')}
    `;
}

// Renderizar KPIs de Defectos
function renderDefectosKPIs(kpis) {
    const container = document.getElementById('defectosKPIs');
    container.innerHTML = `
        ${createKPICard('Issues Shift Left', kpis.issuesShiftLeft, 'fas fa-exclamation-triangle', '#f59e0b')}
        ${createKPICard('Issues Ejecución', kpis.issuesEjecucion, 'fas fa-exclamation-circle', '#ef4444')}
        ${createKPICard('Total Issues', kpis.totalIssues, 'fas fa-bug', '#dc2626', true)}
        ${createKPICard('Issues No Resueltos', kpis.issuesNoResueltos, 'fas fa-times-circle', '#991b1b')}
        ${createKPICard('Escape Rate UAT', kpis.escapeRateUAT + '%', 'fas fa-shield-alt', getSemaforoColor(kpis.escapeRateUAT, true))}
        ${createKPICard('Escape Rate Productivo', kpis.escapeRateProductivo + '%', 'fas fa-rocket', getSemaforoColor(kpis.escapeRateProductivo, true))}
        ${createKPICard('MTTR Promedio', kpis.mttrPromedio + ' días', 'fas fa-clock', '#8b5cf6')}
    `;
}

// Renderizar KPIs de Efectividad
function renderEfectividadKPIs(kpis) {
    const container = document.getElementById('efectividadKPIs');
    container.innerHTML = `
        ${createKPICard('Efectividad Ciclo 1', kpis.efectividadCiclo1 + '%', 'fas fa-star', getSemaforoColor(kpis.efectividadCiclo1), false, getSemaforoBadge(kpis.efectividadCiclo1))}
        ${createKPICard('Efectividad Ciclos QA', kpis.efectividadCiclosQA + '%', 'fas fa-check-double', getSemaforoColor(kpis.efectividadCiclosQA), false, getSemaforoBadge(kpis.efectividadCiclosQA))}
        ${createKPICard('Efectividad UAT', kpis.efectividadUAT + '%', 'fas fa-user-check', getSemaforoColor(kpis.efectividadUAT), false, getSemaforoBadge(kpis.efectividadUAT))}
        ${createKPICard('Efectividad General', kpis.efectividadEjecucion + '%', 'fas fa-chart-line', getSemaforoColor(kpis.efectividadEjecucion), false, getSemaforoBadge(kpis.efectividadEjecucion))}
    `;
}

// Renderizar KPIs de Desviaciones
function renderDesviacionesKPIs(kpis) {
    const container = document.getElementById('desviacionesKPIs');
    container.innerHTML = `
        <div class="col-md-6">
            ${createKPICard('Horas Desviación Total', kpis.horasDesviacion.toLocaleString() + ' hrs', 'fas fa-clock', '#ef4444')}
        </div>
    `;
}

// Crear tarjeta de KPI
function createKPICard(title, value, icon, color, destacado = false, badge = '') {
    const bgClass = destacado ? 'text-white' : '';
    const bgStyle = destacado ? `background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);` : '';

    return `
        <div class="col-md-6 col-lg-${destacado ? '4' : '2'}">
            <div class="kpi-card ${bgClass}" style="${bgStyle}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="kpi-title ${bgClass}">${title}</div>
                        <div class="kpi-value" style="color: ${destacado ? 'white' : color}">${value}</div>
                        ${badge ? `<div class="mt-2">${badge}</div>` : ''}
                    </div>
                    <div class="kpi-icon" style="background-color: ${color}20; color: ${destacado ? 'white' : color}">
                        <i class="${icon}"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Obtener color según semáforo
function getSemaforoColor(valor, invertir = false) {
    if (invertir) {
        if (valor <= 10) return '#10b981'; // Verde
        if (valor <= 20) return '#f59e0b'; // Amarillo
        return '#ef4444'; // Rojo
    } else {
        if (valor >= 90) return '#10b981'; // Verde
        if (valor >= 70) return '#f59e0b'; // Amarillo
        return '#ef4444'; // Rojo
    }
}

// Obtener badge de semáforo
function getSemaforoBadge(valor) {
    let icon, text, bgClass;
    if (valor >= 90) {
        icon = '🟢';
        text = 'Excelente';
        bgClass = 'bg-success';
    } else if (valor >= 70) {
        icon = '🟡';
        text = 'Aceptable';
        bgClass = 'bg-warning';
    } else {
        icon = '🔴';
        text = 'Mejorar';
        bgClass = 'bg-danger';
    }
    return `<span class="badge ${bgClass} badge-semaforo">${icon} ${text}</span>`;
}

// Renderizar gráficos
function renderCharts(data, kpis) {
    const tendencias = prepararDatosMensuales(data);

    renderCasosPruebaChart(tendencias);
    renderDefectosChart(tendencias);
    renderEfectividadChart(tendencias);
    renderEfectividadTendenciaChart(tendencias);
    renderIssuesSeveridadChart(tendencias);
    renderDesviacionesChart(kpis.horasDesviacionPorProyecto);
}

// Preparar datos mensuales
function prepararDatosMensuales(data) {
    const datosPorMes = {};

    data.forEach(row => {
        if (!row['F.Fin Real']) return;

        const fecha = new Date(row['F.Fin Real']);
        const mes = fecha.toISOString().substring(0, 7);

        if (!datosPorMes[mes]) datosPorMes[mes] = [];
        datosPorMes[mes].push(row);
    });

    return Object.entries(datosPorMes)
        .map(([mes, datos]) => ({
            mes,
            mesLabel: mes.substring(5),
            ...calcularTodosLosKPIs(datos)
        }))
        .sort((a, b) => a.mes.localeCompare(b.mes));
}

// Gráfico de Casos de Prueba
function renderCasosPruebaChart(tendencias) {
    const ctx = document.getElementById('casosPruebaChart').getContext('2d');

    if (charts.casosPrueba) charts.casosPrueba.destroy();

    charts.casosPrueba = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tendencias.map(t => t.mesLabel),
            datasets: [
                { label: 'Diseñados', data: tendencias.map(t => t.cpDiseñados), borderColor: '#10b981', tension: 0.4 },
                { label: 'Nuevos', data: tendencias.map(t => t.cpNuevos), borderColor: '#3b82f6', tension: 0.4 },
                { label: 'Modificados', data: tendencias.map(t => t.cpModificados), borderColor: '#06b6d4', tension: 0.4 },
                { label: 'Reutilizados', data: tendencias.map(t => t.cpReutilizados), borderColor: '#6b7280', tension: 0.4 },
                { label: 'Automatizados', data: tendencias.map(t => t.cpAutomatizados), borderColor: '#8b5cf6', tension: 0.4 },
                { label: 'Ejecutados', data: tendencias.map(t => t.cpEjecutados), borderColor: '#1e40af', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Gráfico de Defectos
function renderDefectosChart(tendencias) {
    const ctx = document.getElementById('defectosChart').getContext('2d');

    if (charts.defectos) charts.defectos.destroy();

    charts.defectos = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tendencias.map(t => t.mesLabel),
            datasets: [
                { label: 'Shift Left', data: tendencias.map(t => t.issuesShiftLeft), borderColor: '#f59e0b', backgroundColor: '#f59e0b40', fill: true, tension: 0.4 },
                { label: 'Ejecución', data: tendencias.map(t => t.issuesEjecucion), borderColor: '#ef4444', backgroundColor: '#ef444440', fill: true, tension: 0.4 },
                { label: 'MTTR (días)', data: tendencias.map(t => t.mttrPromedio), borderColor: '#8b5cf6', yAxisID: 'y1', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: { type: 'linear', position: 'left', title: { display: true, text: 'Issues' } },
                y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'MTTR (días)' } }
            }
        }
    });
}

// Gráfico de Efectividad
function renderEfectividadChart(tendencias) {
    const ctx = document.getElementById('efectividadChart').getContext('2d');

    if (charts.efectividad) charts.efectividad.destroy();

    charts.efectividad = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tendencias.map(t => t.mesLabel),
            datasets: [
                { label: 'Ciclo 1', data: tendencias.map(t => t.efectividadCiclo1), borderColor: '#f59e0b', tension: 0.4 },
                { label: 'Ciclos QA', data: tendencias.map(t => t.efectividadCiclosQA), borderColor: '#3b82f6', tension: 0.4 },
                { label: 'UAT', data: tendencias.map(t => t.efectividadUAT), borderColor: '#8b5cf6', tension: 0.4 },
                { label: 'General', data: tendencias.map(t => t.efectividadEjecucion), borderColor: '#10b981', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 90,
                            yMax: 90,
                            borderColor: '#10b981',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: { content: 'Meta 90%', enabled: true }
                        }
                    }
                }
            },
            scales: {
                y: { min: 0, max: 100, title: { display: true, text: '% Efectividad' } }
            }
        }
    });
}

// Gráfico de Efectividad en Tendencias
function renderEfectividadTendenciaChart(tendencias) {
    const ctx = document.getElementById('efectividadTendenciaChart').getContext('2d');

    if (charts.efectividadTendencia) charts.efectividadTendencia.destroy();

    charts.efectividadTendencia = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tendencias.map(t => t.mesLabel),
            datasets: [
                { label: 'Ciclo 1', data: tendencias.map(t => t.efectividadCiclo1), borderColor: '#f59e0b', tension: 0.4 },
                { label: 'Ciclos QA', data: tendencias.map(t => t.efectividadCiclosQA), borderColor: '#3b82f6', tension: 0.4 },
                { label: 'UAT', data: tendencias.map(t => t.efectividadUAT), borderColor: '#8b5cf6', tension: 0.4 },
                { label: 'General', data: tendencias.map(t => t.efectividadEjecucion), borderColor: '#10b981', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });
}

// Gráfico de Issues por Severidad
function renderIssuesSeveridadChart(tendencias) {
    const ctx = document.getElementById('issuesSeveridadChart').getContext('2d');

    if (charts.issuesSeveridad) charts.issuesSeveridad.destroy();

    // Calcular issues por severidad
    const severidadPorMes = tendencias.map(t => {
        const shiftLeft = filteredData.filter(r =>
            ACTIVIDADES.SHIFT_LEFT.includes(r.Actividad) &&
            r['F.Fin Real'] &&
            new Date(r['F.Fin Real']).toISOString().substring(0, 7) === t.mes
        );
        const ejecucion = filteredData.filter(r =>
            ACTIVIDADES_EJECUCION.includes(r.Actividad) &&
            r['F.Fin Real'] &&
            new Date(r['F.Fin Real']).toISOString().substring(0, 7) === t.mes
        );

        return {
            mes: t.mesLabel,
            slBloqueantes: shiftLeft.reduce((s, r) => s + r['Issues Bloqueantes'], 0),
            slCriticos: shiftLeft.reduce((s, r) => s + r['Issues Críticos'], 0),
            slAltos: shiftLeft.reduce((s, r) => s + r['Issues Altos'], 0),
            slMenores: shiftLeft.reduce((s, r) => s + r['Issues Menores'], 0),
            ejBloqueantes: ejecucion.reduce((s, r) => s + r['Issues Bloqueantes'], 0),
            ejCriticos: ejecucion.reduce((s, r) => s + r['Issues Críticos'], 0),
            ejAltos: ejecucion.reduce((s, r) => s + r['Issues Altos'], 0),
            ejMenores: ejecucion.reduce((s, r) => s + r['Issues Menores'], 0)
        };
    });

    charts.issuesSeveridad = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: severidadPorMes.map(d => d.mes),
            datasets: [
                { label: 'SL Bloqueantes', data: severidadPorMes.map(d => d.slBloqueantes), backgroundColor: '#dc2626', stack: 'shift' },
                { label: 'SL Críticos', data: severidadPorMes.map(d => d.slCriticos), backgroundColor: '#f59e0b', stack: 'shift' },
                { label: 'SL Altos', data: severidadPorMes.map(d => d.slAltos), backgroundColor: '#eab308', stack: 'shift' },
                { label: 'SL Menores', data: severidadPorMes.map(d => d.slMenores), backgroundColor: '#84cc16', stack: 'shift' },
                { label: 'Ej Bloqueantes', data: severidadPorMes.map(d => d.ejBloqueantes), backgroundColor: '#7f1d1d', stack: 'ejecucion' },
                { label: 'Ej Críticos', data: severidadPorMes.map(d => d.ejCriticos), backgroundColor: '#b45309', stack: 'ejecucion' },
                { label: 'Ej Altos', data: severidadPorMes.map(d => d.ejAltos), backgroundColor: '#a16207', stack: 'ejecucion' },
                { label: 'Ej Menores', data: severidadPorMes.map(d => d.ejMenores), backgroundColor: '#4d7c0f', stack: 'ejecucion' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { x: { stacked: true }, y: { stacked: true } }
        }
    });
}

// Gráfico de Desviaciones
function renderDesviacionesChart(desviaciones) {
    const ctx = document.getElementById('desviacionesChart').getContext('2d');

    if (charts.desviaciones) charts.desviaciones.destroy();

    charts.desviaciones = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: desviaciones.map(d => d.proyecto),
            datasets: [{
                label: 'Horas de Desviación',
                data: desviaciones.map(d => d.horas),
                backgroundColor: '#ef4444'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });
}

// Cambiar tabs
function cambiarTab(tab) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
}
