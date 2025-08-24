import React from 'react';
import './PageHeader.css'; // Make sure the import path is correct

// Renamed from PageTitle to PageHeader, and prop from 'title' to 'pageTitle'
const PageHeader = ({ pageTitle }) => {
  return (
    <header className="page-header">
      <div className="page-title-strip">
        <h1 className="page-title">{pageTitle}</h1>
      </div>
    </header>
  );
};

export default PageHeader;