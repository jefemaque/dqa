import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { processExcelFile, validateExcelStructure } from '../utils/excelProcessor';

const ExcelUploader = ({ onDataLoaded }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validar que sea un archivo Excel
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|ods)$/i)) {
      setError('Por favor selecciona un archivo Excel válido (.xlsx, .xls)');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await processExcelFile(file);

      // Validar estructura
      const validation = validateExcelStructure(result.data);

      if (validation.warning) {
        setSuccess(validation.message);
      } else if (validation.valid) {
        setSuccess(`Archivo cargado exitosamente: ${result.data.length} registros encontrados`);
      } else {
        setError(validation.message);
        setUploading(false);
        return;
      }

      // Enviar datos al componente padre
      onDataLoaded(result.data);

    } catch (err) {
      setError(err.message || 'Error al procesar el archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  return (
    <div className="upload-section">
      <h3 className="mb-4">Cargar Datos de Testing</h3>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="upload-icon">
          <i className="fas fa-cloud-upload-alt"></i>
        </div>
        <div className="upload-text">
          {uploading ? 'Procesando archivo...' : 'Arrastra tu archivo Excel aquí'}
        </div>
        <div className="upload-hint">
          o haz clic para seleccionar un archivo
        </div>
        <Button
          variant="primary"
          className="btn-upload"
          disabled={uploading}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById('fileInput').click();
          }}
        >
          {uploading ? 'Cargando...' : 'Seleccionar Archivo'}
        </Button>
      </div>

      <input
        id="fileInput"
        type="file"
        accept=".xlsx,.xls,.ods"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />

      <div className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
        <strong>Formato esperado del Excel:</strong>
        <ul className="mt-2" style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Fecha</li>
          <li>Total Pruebas</li>
          <li>Aprobadas</li>
          <li>Fallidas</li>
          <li>Pendientes</li>
          <li>Tiempo Promedio (min) - opcional</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelUploader;
