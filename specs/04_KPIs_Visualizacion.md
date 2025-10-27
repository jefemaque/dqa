# 04 - KPIs: Especificaciones de Visualización

**Última actualización:** 26 de octubre, 2025

---

## 📊 Resumen

Este documento especifica **cómo visualizar** cada uno de los 21 KPIs del Dashboard QA, incluyendo:
- Tipo de visualización (totalizado, mensual, gráfica)
- Tipo de gráfico (line, area, bar, gauge, etc.)
- Colores y formato
- Semáforos y umbrales

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
```

---

## 📋 CATEGORÍA 1: CASOS DE PRUEBA (6 KPIs)

### **KPI 1: CP Diseñados**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Valor:** Número entero con separador de miles
- **Formato:** `1,250 CP`
- **Color:** Verde (`#10b981`)
- **Icono:** 📝 o `<FileText />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Eje X:** Meses (formato: "Ene 2025", "Feb 2025", etc.)
- **Eje Y:** Cantidad de CP
- **Color línea:** Verde (`#10b981`)
- **Puntos:** Círculos rellenos
- **Tooltip:** `Mes: {mes}<br>CP Diseñados: {valor}`

**Ubicación en Dashboard:**
- Sección: Casos de Prueba
- Orden: Primera tarjeta

---

### **KPI 2: CP Nuevos**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Valor:** Número entero
- **Formato:** `350 CP`
- **Color:** Azul (`#3b82f6`)
- **Icono:** ✨ o `<Plus />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Color línea:** Azul (`#3b82f6`)

**Ubicación:** Casos de Prueba - Segunda tarjeta

---

### **KPI 3: CP Modificados**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `180 CP`
- **Color:** Cyan (`#06b6d4`)
- **Icono:** 🔄 o `<Edit />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Color línea:** Cyan (`#06b6d4`)

**Ubicación:** Casos de Prueba - Tercera tarjeta

---

### **KPI 4: CP Reutilizados**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `720 CP`
- **Color:** Gris (`#6b7280`)
- **Icono:** ♻️ o `<Repeat />`
- **Nota:** KPI independiente, NO se suma en CP Diseñados

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Color línea:** Gris (`#6b7280`)

**Ubicación:** Casos de Prueba - Cuarta tarjeta

---

### **KPI 5: CP Automatizados**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `450 CP`
- **Color:** Púrpura (`#8b5cf6`)
- **Icono:** 🤖 o `<Zap />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Color línea:** Púrpura (`#8b5cf6`)

**Ubicación:** Casos de Prueba - Quinta tarjeta

---

### **KPI 6: CP Ejecutados**

**Visualización Principal:**
- **Tipo:** KPI Card (totalizado)
- **Formato:** `1,100 CP`
- **Color:** Azul oscuro (`#1e40af`)
- **Icono:** ✅ o `<CheckCircle />`

**Visualización Secundaria:**
- **Tipo:** Gráfico de línea (tendencia mensual)
- **Color línea:** Azul oscuro (`#1e40af`)

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
- **Eje X:** Meses
- **Eje Y:** Porcentaje (0-100%)
- **Línea:** Color según semáforo del mes
- **Bandas de fondo:**
  - Verde: 0-5%
  - Amarillo: 5-10%
  - Rojo: 10-100%
- **Tooltip:** `Mes: {mes}<br>Escape Rate: {valor}%<br>Estado: {semáforo_emoji}`

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
- **Eje X:** Meses
- **Eje Y:** Días (0-10)
- **Barras:** Color según semáforo del mes
- **Línea horizontal:** Meta de 3 días (línea punteada verde)
- **Tooltip:** `Mes: {mes}<br>MTTR: {valor} días<br>Estado: {semáforo}`

**Ubicación:** Defectos - Cuarta tarjeta

---

### **KPI 13: Issues por Severidad (Shift Left)**

**Visualización Principal:**
- **Tipo:** Gráfico de área apilada (Stacked Area Chart)
- **Eje X:** Meses
- **Eje Y:** Cantidad de Issues
- **Series (de abajo hacia arriba):**
  1. **Menores** - Color: `#a3e635` (Verde lima)
  2. **Altos** - Color: `#f59e0b` (Naranja)
  3. **Críticos** - Color: `#ef4444` (Rojo)
  4. **Bloqueantes** - Color: `#991b1b` (Rojo oscuro)
- **Tooltip:** 
  ```
  Mes: {mes}
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
- **Series:** Misma configuración que KPI 13
- **Tooltip:** 
  ```
  Mes: {mes}
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
- **Color barras:** Rojo con gradiente
- **Tooltip:** `Mes: {mes}<br>Desviación: {valor} hrs`

**Ubicación:** Desviaciones - Primera tarjeta

---

### **KPI 21: Horas de Desviación por Proyecto**

**Visualización Principal:**
- **Tipo:** Bar Chart horizontal (TOP proyectos)
- **Eje X:** Horas
- **Eje Y:** Nombre del Proyecto
- **Color:** Rojo con gradiente (más oscuro = más horas)
- **Formato:** `X,XXX hrs` por proyecto
- **Límite:** Top 10 proyectos con más desviación
- **Orden:** Descendente (mayor a menor)

**Tooltip:**
```
Proyecto: {nombre}
Horas Desviación: {valor} hrs
% del Total: {porcentaje}%
```

**Ubicación:** Desviaciones - Gráfico ancho completo

---

## 📐 Especificaciones de Componentes UI

### **KPI Card (Estándar)**

```jsx
<Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1">{título}</p>
      <p className="text-3xl font-bold" style={{color: colorKPI}}>
        {valor}
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

### **Gauge Chart (Semáforo)**

```jsx
<GaugeChart
  value={valor}
  min={0}
  max={100}
  segments={[
    { threshold: umbralVerde, color: "#10b981", label: "Bajo" },
    { threshold: umbralAmarillo, color: "#f59e0b", label: "Medio" },
    { threshold: 100, color: "#ef4444", label: "Alto" }
  ]}
  arcWidth={0.3}
  needleColor="#374151"
  needleBaseColor="#6b7280"
  label={`${valor}%`}
  labelStyle={{ fontSize: "24px", fontWeight: "bold" }}
/>
```

**Dimensiones:**
- Width: 100%
- Height: 200px

---

### **Line Chart (Tendencia Mensual)**

```jsx
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
  />
  <Tooltip 
    contentStyle={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px'
    }}
  />
  <Line 
    type="monotone" 
    dataKey="valor" 
    stroke={color}
    strokeWidth={2}
    dot={{ r: 4, fill: color }}
    activeDot={{ r: 6 }}
  />
</LineChart>
```

---

### **Stacked Area Chart (Severidades)**

```jsx
<AreaChart data={dataMensual} height={400}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="mes" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Area 
    dataKey="menores" 
    stackId="1" 
    fill="#a3e635" 
    stroke="#a3e635"
    name="Menores"
  />
  <Area 
    dataKey="altos" 
    stackId="1" 
    fill="#f59e0b" 
    stroke="#f59e0b"
    name="Altos"
  />
  <Area 
    dataKey="criticos" 
    stackId="1" 
    fill="#ef4444" 
    stroke="#ef4444"
    name="Críticos"
  />
  <Area 
    dataKey="bloqueantes" 
    stackId="1" 
    fill="#991b1b" 
    stroke="#991b1b"
    name="Bloqueantes"
  />
</AreaChart>
```

---

## 📊 Layout por Secciones

### **Sección 1: Casos de Prueba** (Grid 3 columnas)
```
┌─────────────┬─────────────┬─────────────┐
│ CP Diseñados│  CP Nuevos  │CP Modificados│
├─────────────┼─────────────┼─────────────┤
│CP Reutiliz. │CP Automati. │ CP Ejecut.  │
└─────────────┴─────────────┴─────────────┘
```

### **Sección 2: Defectos** (Grid mixto)
```
┌──────────────┬──────────────┬──────────────┐
│Issues Shift  │Issues Ejecuc.│Total Issues  │
│   Left       │              │ (destacado)  │
├──────────────┼──────────────┼──────────────┤
│ Escape UAT   │Escape Produc.│    MTTR      │
│  (gauge)     │   (gauge)    │              │
├──────────────┼──────────────┼──────────────┤
│Issues No Res.│              │              │
├──────────────┴──────────────┴──────────────┤
│ Issues por Severidad Shift Left (full)     │
├────────────────────────────────────────────┤
│ Issues por Severidad Ejecución (full)      │
└────────────────────────────────────────────┘
```

### **Sección 3: Efectividad** (Grid 2 columnas destacadas)
```
┌─────────────────────┬─────────────────────┐
│  Efectividad Ciclo 1│ Efectividad Ciclos  │
│    (destacado)      │        QA           │
├─────────────────────┼─────────────────────┤
│  Efectividad UAT    │ Efectividad Gral    │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

### **Sección 4: Desviaciones** (Grid vertical)
```
┌─────────────────────┬─────────────────────┐
│ Horas Desviación    │                     │
│      Total          │                     │
├─────────────────────┴─────────────────────┤
│ Horas Desviación por Proyecto (full)      │
│         (Bar Chart horizontal)             │
└────────────────────────────────────────────┘
```

---

## 🎨 Reglas de Formato

### **Números:**
- Enteros: Separador de miles con coma (ej: `1,250`)
- Decimales: 1 cifra decimal (ej: `3.3`)
- Porcentajes: 1 decimal + símbolo % (ej: `7.5%`)

### **Fechas:**
- Formato corto: `Ene 2025`, `Feb 2025`
- Formato completo: `Enero 2025`

### **Tooltips:**
- Fondo: Blanco con sombra
- Border: 1px solid #e5e7eb
- Padding: 12px
- Border radius: 8px
- Fuente: 14px

### **Animaciones:**
- Entrada de tarjetas: Fade in con stagger de 100ms
- Transición de valores: 300ms ease-in-out
- Hover en gráficos: Scale 1.05
- Hover en tarjetas: Elevación de sombra

---

## 🔗 Documentos Relacionados

- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Fórmulas de cada KPI
- **[06_Especificaciones_Dashboard.md](./06_Especificaciones_Dashboard.md)** - Layout general y filtros
