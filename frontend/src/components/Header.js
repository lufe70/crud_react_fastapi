import React from 'react';

const Header = ({ title, button }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {button && button}
    </div>
  );
};

export default Header;
