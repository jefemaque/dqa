import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';

const ExcelUploaderQA = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (file) => {
    setError(null);

    if (!file) return;

    // Validar tipo de archivo
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.oasis.opendocument.spreadsheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|ods)$/i)) {
      setError('Por favor selecciona un archivo Excel válido (.xlsx, .xls, .ods)');
      return;
    }

    try {
      await onFileUpload(file);
    } catch (err) {
      setError('Error al procesar el archivo. Verifica que tenga el formato correcto.');
      console.error(err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="mb-4">
      <div
        className={`excel-uploader ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? '#f0f7ff' : '#fafafa',
          transition: 'all 0.3s ease'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.ods"
          onChange={(e) => handleFileChange(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <i className="fas fa-file-excel fa-3x text-success mb-3"></i>
        <h5>Cargar Archivo Excel</h5>
        <p className="text-muted mb-0">
          Arrastra y suelta tu archivo aquí o haz clic para seleccionar
        </p>
        <small className="text-muted">Formatos soportados: .xlsx, .xls, .ods</small>
      </div>

      {error && (
        <Alert variant="danger" className="mt-3" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default ExcelUploaderQA;
