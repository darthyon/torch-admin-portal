import React from 'react';

const SectionHeader = ({ title, actions }) => {
  return (
    <div className="torch-section-header">
      <h2 className="torch-section-title">{title}</h2>
      {actions && (
        <div className="torch-section-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
