import React from 'react';
import { Link } from 'react-router-dom';

const DataTable = ({ 
  data, 
  columns, 
  actions = [], 
  statusFields = [],
  linkFields = [],
  onActionClick = null 
}) => {
  const renderCell = (item, column) => {
    const value = item[column.key];
    
    // Handle status fields with special styling
    if (statusFields.includes(column.key)) {
      return (
        <span className={`torch-status ${value ? 'torch-status-true' : 'torch-status-false'}`}>
          {typeof value === 'boolean' ? (value ? 'true' : 'false') : value}
        </span>
      );
    }
    
    // Handle link fields
    if (linkFields.includes(column.key)) {
      return (
        <Link to={`/organizations/${item.id}`} className="torch-btn-show">
          {value}
        </Link>
      );
    }
    
    return value;
  };

  const renderActions = (item) => {
    return actions.map((action, index) => {
      if (action.type === 'link') {
        return (
          <Link 
            key={index}
            to={action.href(item)} 
            className="torch-btn-show"
          >
            {action.label}
          </Link>
        );
      }
      
      if (action.type === 'button') {
        return (
          <button 
            key={index}
            className="torch-btn-show"
            onClick={() => onActionClick && onActionClick(action.key, item)}
          >
            {action.label}
          </button>
        );
      }
      
      return null;
    });
  };

  return (
    <table className="torch-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
          {actions.length > 0 && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map((column) => (
              <td key={column.key}>
                {renderCell(item, column)}
              </td>
            ))}
            {actions.length > 0 && (
              <td>
                {renderActions(item)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
