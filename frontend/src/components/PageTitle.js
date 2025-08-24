import React from 'react';
import './PageTitle.css'; // We'll add the styles in the next step

// We accept 'props' and then get the 'title' from it.
const PageTitle = ({ title }) => {
  return (
    <header className="page-header">
      <div className="page-title-strip">
        <h1 className="page-title">{title}</h1>
      </div>
    </header>
  );
};

export default PageTitle;