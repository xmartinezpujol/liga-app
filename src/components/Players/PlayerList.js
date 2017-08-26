import React from 'react';
import Player from './Player';

class PlayerList extends React.Component{
  render() {
    return(
      <div className="player-list">
        {this.props.players.map((player) => {
          return(
            <Player key={player.name} player={player}/>
          );
        })}
      </div>
    );
  }
}

export default PlayerList;
