import React from 'react';

const Player = (props) => {
  return(
    <div className="player-item">
      <div className="crest-wrapper">
        <img className="player-teamcrest" src={props.player.crestUrl} alt={props.player.team} />
      </div>
      <p>{props.player.name}</p>
      <p>{props.player.nationality}</p>
      <p>{props.player.position}</p>
      <p>{props.player.jerseyNumber}</p>
      <p>{props.player.team}</p>
    </div>
  );
}

export default Player;
