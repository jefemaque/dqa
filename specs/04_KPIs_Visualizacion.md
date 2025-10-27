# 04 - KPIs: Especificaciones de Visualización

**Última actualización:** 27 de octubre, 2025  
**Versión:** 2.1

---

## 📊 Resumen

Este documento especifica **cómo visualizar** cada uno de los 21 KPIs del Dashboard QA, incluyendo:
- Tipo de visualización (totalizado, mensual, gráfica)
- Tipo de gráfico (line, area, bar, gauge, etc.)
- Colores y formato
- Semáforos y umbrales
- **✨ v2.1: Formato de meses en español (ENE, FEB, MAR...)**
- **✨ v2.1: Formato CP sin decimales con coma (1,250)**
- **✨ v2.1: Tendencias mensuales para TODOS los CP**
- **✨ v2.1: Composición de Desviaciones (Donut Chart)**

---

## 🎨 Paleta de Colores Global

```css
/* Colores principales de KPIs */
--color-blue: #3b82f6       /* Azul - CP, Métricas principales */
--color-green: #10b981      /* Verde - Positivo, Completado */
--color-red: #ef4444        /* Rojo - Defectos, Crítico */
--color-orange: #f59e0b     /* Naranja - Advertencia */
--color-purple: #8b5cf6     /* Púrpura - Automatización */
--color-violet: #9333ea     /* Morado - Shift Left */
--color-cyan: #06b6d4       /* Cyan - Secundario */
--color-gray: #6b7280       /* Gris - Neutral */
--color-dark-blue: #1e40af  /* Azul oscuro - CP Ejecutados */
--color-dark-red: #dc2626   /* Rojo oscuro - Issues no resueltos */

/* Semáforos */
--color-success: #10b981    /* 🟢 Verde */
--color-warning: #f59e0b    /* 🟡 Amarillo */
--color-danger: #ef4444     /* 🔴 Rojo */

/* Colores para Issues por Severidad */
--color-bloqueante: #991b1b  /* Rojo oscuro */
--color-critico: #ef4444     /* Rojo */
--color-alto: #f59e0b        /* Naranja */
--color-menor: #a3e635       /* Verde lima */

/* Colores para Composición de Desviaciones */
--color-desv-1: #dc2626     /* Rojo oscuro */
--color-desv-2: #ef4444     /* Rojo */
--color-desv-3: #f59e0b     /* Naranja */
--color-desv-4: #fb923c     /* Naranja claro */
--color-desv-5: #fca5a5     /* Rosa claro */
```

---

## 📅 FORMATO DE EJE X (MESES) - v2.1 ✨

**ESTÁNDAR PARA TODOS LOS GRÁFICOS DE TENDENCIA MENSUAL:**

### Especificaciones
- **Formato:** Primeras 3 letras del mes en MAYÚSCULAS
- **Idioma:** Español
- **Meses:** ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC
- **Comportamiento:** Mostrar TODOS los 12 meses del año, aunque no haya datos
- **Meses sin datos:** Mostrar valor en 0 o punto vacío en el gráfico

### Ejemplo de Eje X
```
ENE  FEB  MAR  ABR  MAY  JUN  JUL  AGO  SEP  OCT  NOV  DIC
```

### Implementación JavaScript
```javascript
// Constante de meses en español
const MESES_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

// Función para generar datos mensuales completos
function generarDatosMensuales(datos, año) {
  const datosPorMes = {};
  
  // Agrupar datos por mes
  datos.forEach(row => {
    if (row['F.Fin Real']) {
      const fecha = new Date(row['F.Fin Real']);
      if (fecha.getFullYear() === año) {
        const mes = fecha.getMonth(); // 0-11
        const mesNombre = MESES_ES[mes];
        datosPorMes[mesNombre] = (datosPorMes[mesNombre] || 0) + (row.valor || 0);
      }
    }
  });
  
  // Crear array con todos los 12 meses
  return MESES_ES.map(mes => ({
    mes: mes,
    valor: datosPorMes[mes] || 0
  }));
}
```

---

## 📋 CATEGORÍA 1: CASOS DE PRUEBA (6 KPIs)

### **KPI 1: CP Diseñados** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Valor:** Número entero con separador de miles
- **Formato:** `1,250 CP` (sin decimales, coma como separador de miles)
- **Color:** Verde (`#10b981`)
- **Icono:** 📝 o `<FileText />`

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Meses del año (formato: "ENE", "FEB", "MAR", ..., "DIC")
  - Mostrar TODOS los 12 meses del año aunque no haya datos
  - Si no hay datos en un mes, mostrar valor en 0 o punto vacío
- **Eje Y:** Cantidad de CP (sin decimales, con coma como separador de miles)
- **Color línea:** Verde (`#10b981`)
- **Puntos:** Círculos rellenos solo en meses con datos
- **Tooltip:** `{mes}<br>CP Diseñados: {valor:,}`

**Ubicación en Dashboard:**
- Sección: Casos de Prueba
- Orden: Primera tarjeta

---

### **KPI 2: CP Nuevos** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Valor:** Número entero con separador de miles
- **Formato:** `350 CP` (sin decimales, coma como separador)
- **Color:** Azul (`#3b82f6`)
- **Icono:** ✨ o `<Plus />`

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Eje Y:** Cantidad de CP (sin decimales, con coma)
- **Color línea:** Azul (`#3b82f6`)
- **Tooltip:** `{mes}<br>CP Nuevos: {valor:,}`

**Ubicación:** Casos de Prueba - Segunda tarjeta

---

### **KPI 3: CP Modificados** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `180 CP` (sin decimales, coma como separador)
- **Color:** Cyan (`#06b6d4`)
- **Icono:** 🔄 o `<Edit />`

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Cyan (`#06b6d4`)
- **Tooltip:** `{mes}<br>CP Modificados: {valor:,}`

**Ubicación:** Casos de Prueba - Tercera tarjeta

---

### **KPI 4: CP Reutilizados** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `720 CP` (sin decimales, coma como separador)
- **Color:** Gris (`#6b7280`)
- **Icono:** ♻️ o `<Repeat />`
- **Nota:** KPI independiente, NO se suma en CP Diseñados

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Gris (`#6b7280`)
- **Tooltip:** `{mes}<br>CP Reutilizados: {valor:,}`

**Ubicación:** Casos de Prueba - Cuarta tarjeta

---

### **KPI 5: CP Automatizados** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `450 CP` (sin decimales, coma como separador)
- **Color:** Púrpura (`#8b5cf6`)
- **Icono:** 🤖 o `<Zap />`

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Púrpura (`#8b5cf6`)
- **Tooltip:** `{mes}<br>CP Automatizados: {valor:,}`

**Ubicación:** Casos de Prueba - Quinta tarjeta

---

### **KPI 6: CP Ejecutados** ✨ v2.1 ACTUALIZADO

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `1,100 CP` (sin decimales, coma como separador)
- **Color:** Azul oscuro (`#1e40af`)
- **Icono:** ✅ o `<CheckCircle />`

**Visualización Secundaria:** ✨ NUEVO en v2.1
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Azul oscuro (`#1e40af`)
- **Tooltip:** `{mes}<br>CP Ejecutados: {valor:,}`

**Ubicación:** Casos de Prueba - Sexta tarjeta

---

## 🐛 CATEGORÍA 2: DEFECTOS (9 KPIs)

### **KPI 7: Total Issues Shift Left**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `45 Issues`
- **Color:** Morado (`#9333ea`)
- **Icono:** 📋 o `<FileSearch />`
- **Etiqueta:** "Issues Shift Left (Análisis & Diseño)"

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Morado (`#9333ea`)

**Ubicación:** Defectos - Primera tarjeta

---

### **KPI 8: Total Issues en Ejecución**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `189 Issues`
- **Color:** Rojo (`#ef4444`)
- **Icono:** 🐛 o `<Bug />`
- **Etiqueta:** "Issues en Ejecución (Pruebas)"

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Rojo (`#ef4444`)

**Ubicación:** Defectos - Segunda tarjeta

---

### **KPI 9: Total de Issues (Consolidado)**

**Visualización Principal:**
- **Tipo:** KPI Card DESTACADO (totalizado)
- **Formato:** `234 Issues`
- **Color:** Rojo oscuro (`#dc2626`)
- **Icono:** 🔴 o `<AlertTriangle />`
- **Tamaño:** 1.5x más grande que cards normales
- **Etiqueta:** "Total de Issues"

**Visualización Secundaria:**
- **Tipo:** Gráfico de área apilada (2 series)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Series:**
  - Shift Left: Morado (`#9333ea`)
  - Ejecución: Rojo (`#ef4444`)
- **Tooltip:** Muestra desglose por tipo

**Ubicación:** Defectos - Tarjeta destacada (ancho completo o prominente)

---

### **KPI 10: Escape Rate UAT**

**Visualización Principal:**
- **Tipo:** Gauge (semicírculo) + Badge con semáforo
- **Valor:** Porcentaje con 1 decimal
- **Formato:** `7.5%`
- **Rango:** 0% - 100%
- **Semáforo:**
  - 🟢 Verde (`#10b981`): < 5%
  - 🟡 Amarillo (`#f59e0b`): 5% - 10%
  - 🔴 Rojo (`#ef4444`): > 10%
- **Etiqueta:** "Escape Rate UAT"
- **Subtítulo:** "Issues UAT vs Ciclos QA"

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea con bandas de semáforo (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Eje Y:** Porcentaje (0-100%)
- **Línea:** Color según semáforo del mes
- **Bandas de fondo:**
  - Verde: 0-5%
  - Amarillo: 5-10%
  - Rojo: 10-100%
- **Tooltip:** `{mes}<br>Escape Rate: {valor}%<br>Estado: {semáforo_emoji}`

**Ubicación:** Defectos - Tarjeta destacada con gauge

---

### **KPI 11: Escape Rate Productivo**

**Visualización Principal:**
- **Tipo:** Gauge (semicírculo) + Badge con semáforo
- **Formato:** `3.2%`
- **Rango:** 0% - 100%
- **Semáforo:**
  - 🟢 Verde (`#10b981`): < 2%
  - 🟡 Amarillo (`#f59e0b`): 2% - 5%
  - 🔴 Rojo (`#ef4444`): > 5%
- **Etiqueta:** "Escape Rate Productivo"
- **Subtítulo:** "Issues en Estabilización Productiva"

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea con bandas de semáforo
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Bandas de fondo:**
  - Verde: 0-2%
  - Amarillo: 2-5%
  - Rojo: 5-100%

**Ubicación:** Defectos - Tarjeta destacada con gauge

---

### **KPI 12: MTTR Promedio**

**Visualización Principal:**
- **Tipo:** KPI Card + Badge con semáforo
- **Valor:** Número decimal con 1 cifra
- **Formato:** `3.3 días`
- **Color base:** Naranja (`#f59e0b`)
- **Icono:** ⏱️ o `<Clock />`
- **Semáforo:**
  - 🟢 Verde: < 3 días
  - 🟡 Amarillo: 3 - 5 días
  - 🔴 Rojo: > 5 días

**Visualización Secundaria:**
- **Tipo:** Gráfico combinado (barras + línea de meta)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Eje Y:** Días (0-10)
- **Barras:** Color según semáforo del mes
- **Línea horizontal:** Meta de 3 días (línea punteada verde)
- **Tooltip:** `{mes}<br>MTTR: {valor} días<br>Estado: {semáforo}`

**Ubicación:** Defectos - Cuarta tarjeta

---

### **KPI 13: Issues por Severidad (Shift Left)**

**Visualización Principal:**
- **Tipo:** Gráfico de área apilada (Stacked Area Chart)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Eje Y:** Cantidad de Issues
- **Series (de abajo hacia arriba):**
  1. **Menores** - Color: `#a3e635` (Verde lima)
  2. **Altos** - Color: `#f59e0b` (Naranja)
  3. **Críticos** - Color: `#ef4444` (Rojo)
  4. **Bloqueantes** - Color: `#991b1b` (Rojo oscuro)
- **Tooltip:** 
  ```
  {mes}
  Shift Left:
  ├─ Bloqueantes: {valor}
  ├─ Críticos: {valor}
  ├─ Altos: {valor}
  └─ Menores: {valor}
  Total: {suma}
  ```
- **Título:** "Distribución de Issues Shift Left por Severidad"

**Ubicación:** Defectos - Gráfico ancho completo

---

### **KPI 14: Issues por Severidad (Ejecución)**

**Visualización Principal:**
- **Tipo:** Gráfico de área apilada (Stacked Area Chart)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Series:** Misma configuración que KPI 13
- **Tooltip:** 
  ```
  {mes}
  Ejecución:
  ├─ Bloqueantes: {valor}
  ├─ Críticos: {valor}
  ├─ Altos: {valor}
  └─ Menores: {valor}
  Total: {suma}
  ```
- **Título:** "Distribución de Issues en Ejecución por Severidad"

**Ubicación:** Defectos - Gráfico ancho completo

---

### **KPI 15: Issues No Resueltos**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `12 Issues`
- **Color:** Rojo oscuro (`#dc2626`)
- **Icono:** ⚠️ o `<AlertCircle />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea + área (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color línea:** Rojo oscuro (`#dc2626`)
- **Color área:** Rojo claro con transparencia (`rgba(220, 38, 38, 0.1)`)

**Ubicación:** Defectos - Quinta tarjeta

---

## 💼 CATEGORÍA 3: EFECTIVIDAD (4 KPIs)

### **KPI 16: % Efectividad - Ciclo 1**

**Visualización Principal:**
- **Tipo:** KPI Card DESTACADO + Badge con semáforo
- **Formato:** `92.5%`
- **Color:** Naranja (`#f59e0b`)
- **Icono:** 🎯 o `<Target />`
- **Tamaño:** Más grande que cards normales
- **Etiqueta:** "Efectividad Ciclo 1"
- **Subtítulo:** "Calidad en primera ejecución"
- **Semáforo:**
  - 🟢 Verde: > 90%
  - 🟡 Amarillo: 80% - 90%
  - 🔴 Rojo: < 80%

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea con meta
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Línea horizontal:** Meta 90% (línea punteada verde)
- **Color línea:** Naranja con gradiente

**Ubicación:** Efectividad - Primera tarjeta (destacada)

---

### **KPI 17: % Efectividad Promedio - Ciclos QA**

**Visualización Principal:**
- **Tipo:** KPI Card + Badge con semáforo
- **Formato:** `88.3%`
- **Color:** Azul (`#3b82f6`)
- **Icono:** 📊 o `<BarChart2 />`
- **Semáforo:** Igual que KPI 16

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color:** Azul (`#3b82f6`)

**Ubicación:** Efectividad - Segunda tarjeta

---

### **KPI 18: % Efectividad Promedio - UAT**

**Visualización Principal:**
- **Tipo:** KPI Card + Badge con semáforo
- **Formato:** `85.7%`
- **Color:** Púrpura (`#8b5cf6`)
- **Icono:** ✔️ o `<CheckSquare />`
- **Semáforo:** Igual que KPI 16

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color:** Púrpura (`#8b5cf6`)

**Ubicación:** Efectividad - Tercera tarjeta

---

### **KPI 19: % Efectividad Promedio - Ejecución**

**Visualización Principal:**
- **Tipo:** KPI Card + Badge con semáforo
- **Formato:** `91.2%`
- **Color:** Verde (`#10b981`)
- **Icono:** 🏆 o `<Award />`
- **Etiqueta:** "Efectividad General"
- **Subtítulo:** "Promedio consolidado"
- **Semáforo:** Igual que KPI 16

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color:** Verde (`#10b981`)

**Ubicación:** Efectividad - Cuarta tarjeta

---

## 📉 CATEGORÍA 4: DESVIACIONES (2 KPIs)

### **KPI 20: Horas de Desviación Total**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `180 hrs`
- **Color:** Rojo (`#ef4444`)
- **Icono:** 📉 o `<TrendingDown />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de barras (tendencia mensual)
- **Eje X:** Formato estándar de meses (ENE, FEB, MAR, ...)
- **Color barras:** Rojo con gradiente
- **Tooltip:** `{mes}<br>Desviación: {valor} hrs`

**Ubicación:** Desviaciones - Primera tarjeta

---

### **KPI 21: Composición de Desviaciones** ✨ v2.1 NUEVO

**Definición:**  
Distribución de horas de desviación por tipo de retraso, mostrando la composición de las causas de desviación.

**Visualización Principal:**
- **Tipo:** Donut Chart (gráfico de dona)
- **Datos:** 5 tipos de retraso con sus horas acumuladas
- **Colores:** Gradiente de rojos/naranjas
  - Retraso por definiciones Incompletas o Ambigüas: `#dc2626`
  - Retraso por entrega tardía de desarrollo: `#ef4444`
  - Retraso por indisponibilidad de ambientes: `#f59e0b`
  - Retraso por cambios en el alcance: `#fb923c`
  - Retraso por ineficiencias con el equipo: `#fca5a5`
- **Centro del Donut:** Total de horas de desviación
- **Leyenda:** A la derecha con porcentajes

**Tooltip:**
```
{tipo_retraso}
Horas: {valor} hrs
% del Total: {porcentaje}%
```

**Visualización Alternativa (Tabla):**
- Tabla ordenada descendente por horas
- Columnas: Tipo de Retraso | Horas | % del Total | Barra visual

**Ejemplo:**
```
Tipo de Retraso                          │ Horas │  %   │ Gráfico
─────────────────────────────────────────┼───────┼──────┼─────────────
Entrega tardía de desarrollo             │  65   │ 36%  │ ████████████
Definiciones incompletas o ambiguas      │  45   │ 25%  │ ████████
Cambios en el alcance                    │  35   │ 19%  │ ██████
Indisponibilidad de ambientes            │  25   │ 14%  │ ████
Ineficiencias con el equipo              │  10   │  6%  │ ██
─────────────────────────────────────────┼───────┼──────┼─────────────
TOTAL                                    │ 180   │ 100% │
```

**Ubicación:** Desviaciones - Gráfico/tabla ancho completo

---

## 📐 Especificaciones de Componentes UI

### **KPI Card (Estándar)**

```jsx
<Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1">{título}</p>
      <p className="text-3xl font-bold" style={{color: colorKPI}}>
        {valor.toLocaleString('es-ES')} {/* Formato con comas */}
      </p>
      {badge && (
        <Badge variant={badgeVariant} className="mt-2">
          {badgeText}
        </Badge>
      )}
    </div>
    <div className="text-4xl opacity-80">
      {icono}
    </div>
  </div>
</Card>
```

**Dimensiones:**
- Min width: 250px
- Height: 140px
- Padding: 24px
- Border radius: 12px

---

### **Line Chart (Tendencia Mensual con Meses en Español)**

```jsx
// Preparar datos con todos los meses del año
const MESES_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const dataMensual = MESES_ES.map((mes, index) => ({
  mes: mes,
  valor: datosPorMes[mes] || 0 // 0 si no hay datos
}));

<LineChart data={dataMensual} height={300}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
  <XAxis 
    dataKey="mes" 
    stroke="#6b7280"
    style={{ fontSize: '12px' }}
  />
  <YAxis 
    stroke="#6b7280"
    style={{ fontSize: '12px' }}
    tickFormatter={(value) => value.toLocaleString('es-ES')} // Formato con comas
  />
  <Tooltip 
    contentStyle={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px'
    }}
    formatter={(value) => value.toLocaleString('es-ES')} // Formato con comas
  />
  <Line 
    type="monotone" 
    dataKey="valor" 
    stroke={color}
    strokeWidth={2}
    dot={(props) => {
      // Solo mostrar punto si hay datos
      if (props.payload.valor > 0) {
        return <circle {...props} r={4} fill={color} />;
      }
      return null;
    }}
    activeDot={{ r: 6 }}
  />
</LineChart>
```

---

### **Donut Chart (Composición de Desviaciones)**

```jsx
<PieChart width={400} height={400}>
  <Pie
    data={dataDesviaciones}
    cx="50%"
    cy="50%"
    innerRadius={80}
    outerRadius={120}
    fill="#8884d8"
    dataKey="horas"
    label={({ nombre, porcentaje }) => `${nombre}: ${porcentaje}%`}
  >
    {dataDesviaciones.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip 
    formatter={(value) => `${value.toLocaleString('es-ES')} hrs`}
  />
  <Legend />
</PieChart>
```

---

## 🎨 Reglas de Formato

### **Números:**
- **Enteros:** Separador de miles con coma (ej: `1,250`)
  - JavaScript: `valor.toLocaleString('es-ES')`
- **Decimales:** 1 cifra decimal (ej: `3.3`)
- **Porcentajes:** 1 decimal + símbolo % (ej: `7.5%`)

### **Meses (NUEVO ESTÁNDAR v2.1):**
- **Formato:** ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC
- **Idioma:** Español
- **Case:** MAYÚSCULAS
- **Mostrar:** TODOS los 12 meses aunque no haya datos

### **Tooltips:**
- Fondo: Blanco con sombra
- Border: 1px solid #e5e7eb
- Padding: 12px
- Border radius: 8px
- Fuente: 14px

---

## 📊 Layout por Secciones

### **Sección 1: Casos de Prueba** (Grid 3 columnas)
```
┌─────────────┬─────────────┬─────────────┐
│ CP Diseñados│  CP Nuevos  │CP Modificados│
│ + Tendencia │ + Tendencia │ + Tendencia  │
├─────────────┼─────────────┼─────────────┤
│CP Reutiliz. │CP Automati. │ CP Ejecut.  │
│ + Tendencia │ + Tendencia │ + Tendencia  │
└─────────────┴─────────────┴─────────────┘
```
**NOTA v2.1:** Todos los 6 KPIs de CP ahora muestran tendencia mensual

### **Sección 4: Desviaciones** (Grid vertical)
```
┌─────────────────────┬─────────────────────┐
│ Horas Desviación    │                     │
│      Total          │                     │
├─────────────────────┴─────────────────────┤
│ Composición de Desviaciones (full width)  │
│    (Donut Chart + Tabla)                  │
└────────────────────────────────────────────┘
```

---

## 🔗 Documentos Relacionados

- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Fórmulas de cada KPI
- **[06_Especificaciones_Dashboard.md](./06_Especificaciones_Dashboard.md)** - Layout general y filtros
