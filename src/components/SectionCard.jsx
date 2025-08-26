import React from 'react';

const SectionCard = ({ title, children, actions, empty = false, emptyMessage = "No datas yet." }) => {
  return (
    <div className="torch-section-card">
      <div className="torch-section-card-header">
        <div className="torch-section-card-title">{title}</div>
        {actions && (
          <div className="torch-section-card-actions">
            {actions}
          </div>
        )}
      </div>
      <div className="torch-section-card-content">
        {empty ? (
          <div className="torch-section-card-empty">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default SectionCard;
