import React from 'react';

const PageHeader = ({ title, children, actions }) => {
  return (
    <div className="torch-page-header">
      <div className="torch-page-header-content">
        <h1 className="torch-page-title">{title}</h1>
        {actions && (
          <div className="torch-page-header-actions">
            {actions}
          </div>
        )}
      </div>
      {children && (
        <div className="torch-page-header-children">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
