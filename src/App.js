import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TotalPlayers from './components/Players/TotalPlayers';

const API_TOKEN = 'f7f2051260a8417b8eae9fb4de617af3';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: null,
      team: null,
      teamurl: null,
      players: null,
      playersurl: null
    };
    this.loadTeamData = this.loadTeamData.bind(this);
    this.loadPlayersData = this.loadPlayersData.bind(this);
  }

  componentDidMount() {
    this.loadTeamData('FC Barcelona');
  }

  loadPlayersData(urlplayer) {
    console.log(urlplayer);
    fetch(urlplayer, {
     method: 'get',
     headers: {
       'X-Auth-Token' : API_TOKEN
     }
    })
      .then(response => response.json())
      .then(res => this.setState(
        {
          players: res.players
        }
      ))
      .then(res => this.loadPlayersData)
      .catch((res) => {
        console.log('ERROR: No data from API!');
      });
  }

  loadTeamData() {
    let urlteam = `http://api.football-data.org/v1/soccerseasons/399/teams`;
    fetch(urlteam, {
     method: 'get',
     headers: {
       'X-Auth-Token' : API_TOKEN
     }
    })
      .then(response => response.json())
      .then(res => this.setState(
        {
          team: res.teams.filter((team) => {
            return team.name === 'FC Barcelona';
          })
        }
      ))
      .then(res => this.loadPlayersData(this.state.team[0]._links.players.href))
      .catch((res) => {
        console.log('ERROR: No data from API!');
      });
  }

  render() {
    const team = this.state.team;
    const players = this.state.players;
    console.log(team);
    console.log(players);

    return (
      <div className="App">
        <Header />
        {players !== null  &&
          <TotalPlayers />
        }
      </div>
    );
  }
}

export default App;
