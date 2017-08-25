import React from 'react';

class TopMenu extends React.Component {
  render() {
    return(
      <div className="top-menu">
        <img className="logo" src="./img/logo.png" alt="Xceed Logo" />
        <span>Frontend The LIGA Challenge</span>
      </div>
    );
  }
}

export default TopMenu;
