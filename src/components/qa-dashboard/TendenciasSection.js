import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TendenciasSection = ({ tendencias }) => {
  const [activeTab, setActiveTab] = useState('casos');

  if (tendencias.length === 0) {
    return null;
  }

  // Preparar datos para casos de prueba
  const datosCasos = tendencias.map(t => ({
    mes: t.mes.substring(5),
    Diseñados: t.cpDiseñados,
    Nuevos: t.cpNuevos,
    Modificados: t.cpModificados,
    Reutilizados: t.cpReutilizados,
    Automatizados: t.cpAutomatizados,
    Ejecutados: t.cpEjecutados
  }));

  // Preparar datos para defectos
  const datosDefectos = tendencias.map(t => ({
    mes: t.mes.substring(5),
    'Shift Left': t.issuesShiftLeft,
    'Ejecución': t.issuesEjecucion,
    'MTTR': t.mttrPromedio
  }));

  // Preparar datos para efectividad
  const datosEfectividad = tendencias.map(t => ({
    mes: t.mes.substring(5),
    'Ciclo 1': t.efectividadCiclo1,
    'Ciclos QA': t.efectividadCiclosQA,
    'UAT': t.efectividadUAT,
    'General': t.efectividadEjecucion
  }));

  return (
    <section className="mb-5">
      <h3 className="mb-4">
        <i className="fas fa-chart-area me-2 text-info"></i>
        Tendencias Mensuales
      </h3>

      <div className="bg-white rounded shadow-sm p-4">
        {/* Tabs */}
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'casos'}
              onClick={() => setActiveTab('casos')}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-clipboard-check me-2"></i>
              Casos de Prueba
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'defectos'}
              onClick={() => setActiveTab('defectos')}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-bug me-2"></i>
              Defectos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'efectividad'}
              onClick={() => setActiveTab('efectividad')}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-trophy me-2"></i>
              Efectividad
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content: Casos de Prueba */}
        {activeTab === 'casos' && (
          <div>
            <h5 className="mb-3">Evolución de Casos de Prueba</h5>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={datosCasos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Diseñados" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="Nuevos" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Modificados" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="Reutilizados" stroke="#6b7280" strokeWidth={2} />
                <Line type="monotone" dataKey="Automatizados" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Ejecutados" stroke="#1e40af" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tab Content: Defectos */}
        {activeTab === 'defectos' && (
          <div>
            <h5 className="mb-3">Evolución de Defectos y MTTR</h5>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={datosDefectos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="Shift Left"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="Ejecución"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="MTTR"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tab Content: Efectividad */}
        {activeTab === 'efectividad' && (
          <div>
            <h5 className="mb-3">Evolución de Efectividad</h5>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={datosEfectividad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={90} stroke="#10b981" strokeDasharray="3 3" label="Meta 90%" />
                <Line type="monotone" dataKey="Ciclo 1" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="Ciclos QA" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="UAT" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="General" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default TendenciasSection;
