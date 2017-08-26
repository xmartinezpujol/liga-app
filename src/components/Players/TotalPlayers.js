import React from 'react';

const texttop = "You're displaying";
const textdown = "Players";

const TotalPlayers = (props) => {
    return(
      <div className="hero-players">
        <span>{texttop}</span>
        <span>{props.count}</span>
        <span>{textdown}</span>
      </div>
    );
}

export default TotalPlayers;
