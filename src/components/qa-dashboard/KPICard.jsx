const KPICard = ({ title, value, icon, color, subtitle, trend, badge }) => {
  return (
    <div className="kpi-card bg-white rounded shadow-sm p-4 h-100">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="flex-grow-1">
          <p className="text-muted mb-1 small">{title}</p>
          <h2 className="mb-0 fw-bold" style={{ color }}>
            {value}
            {subtitle && <small className="text-muted ms-2" style={{ fontSize: '0.5em' }}>{subtitle}</small>}
          </h2>
        </div>
        <div className={`kpi-icon rounded-circle d-flex align-items-center justify-content-center`}
          style={{
            backgroundColor: `${color}20`,
            color: color,
            width: '48px',
            height: '48px'
          }}>
          <i className={icon}></i>
        </div>
      </div>

      {badge && (
        <div className="mb-2">
          <span className={`badge ${badge.className}`}>
            {badge.text}
          </span>
        </div>
      )}

      {trend && (
        <div className="kpi-trend">
          <small className="text-muted">
            {trend.value > 0 ? (
              <i className="fas fa-arrow-up text-success me-1"></i>
            ) : trend.value < 0 ? (
              <i className="fas fa-arrow-down text-danger me-1"></i>
            ) : (
              <i className="fas fa-minus text-muted me-1"></i>
            )}
            {Math.abs(trend.value)}% vs mes anterior
          </small>
        </div>
      )}
    </div>
  );
};

export default KPICard;
