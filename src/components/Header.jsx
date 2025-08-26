import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="torch-header">
      <h1 className="torch-page-title">{title}</h1>
    </header>
  );
};

export default Header;
