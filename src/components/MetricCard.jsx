const MetricCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className="info-box">
      <div className={`info-box-icon ${color}`}>
        <i className={icon}></i>
      </div>
      <div className="info-box-content">
        <div className="info-box-text">{title}</div>
        <div className="info-box-number">
          {value}
          {subtitle && <span style={{ fontSize: '1rem', marginLeft: '10px', color: '#6c757d' }}>{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
