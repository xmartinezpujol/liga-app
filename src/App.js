import React, { Component } from 'react';
import './css/App.css';
import './css/animations.css';
import Header from './components/Header/Header';
import TotalPlayers from './components/Players/TotalPlayers';
import PlayerList from './components/Players/PlayerList';
import PlayerSorter from './components/Players/PlayerSorter';
import { StickyContainer, Sticky } from 'react-sticky';

const API_TOKEN = 'f7f2051260a8417b8eae9fb4de617af3';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      teams: null,
      playerlist: [],
      playerscount: 0
    };
    this.loadTeamsData = this.loadTeamsData.bind(this);
    this.loadPlayersData = this.loadPlayersData.bind(this);
    this.handlePlayersSort = this.handlePlayersSort.bind(this);
  }

  componentWillMount() {
    this.loadTeamsData();
  }

  loadPlayersData(team) {
    const urlteam = team._links.players.href;

    fetch(urlteam, {
      method: 'get',
      headers: {
      'X-Auth-Token' : API_TOKEN
      }
    })
      .then(response => response.json())
      .then(res => {
          let newplayers = [
                res.players
              ];

          let newones = newplayers[0].map((player) => {
            return {...player, team: team.name, crestUrl: team.crestUrl }
          });

          this.setState({
            playerlist: this.state.playerlist.concat(newones)
          });
        }
      )
      .catch((res) => {
        console.log('ERROR: No data from API!');
      });
  }

  loadTeamsData() {
    let urlteam = `http://api.football-data.org/v1/soccerseasons/399/teams`;
    fetch(urlteam, {
      method: 'get',
      headers: {
      'X-Auth-Token' : API_TOKEN
      }
    })
      .then(response => response.json())
      //Save soccerseason teams for later use (if we need it for extra functions in our app)
      .then(res => this.setState(
        {
          teams: res.teams
        }
      ))
      //Request players data for each team on the competition
      .then(() => {
          this.state.teams.map((team) => this.loadPlayersData(team))
        }
      )
      .catch((res) => {
        console.log('ERROR: No data from API!');
      });
  }

  handlePlayersSort(type, order) {
    function compareValues(a, b) {
      if(typeof(a) === 'number' || typeof(b) === 'number'){
        return a - b;
      }
      else{
        return a.localeCompare(b);
      }
    }

    let players = this.state.playerlist;
    let sortedplayers = players.sort((a, b) => {
      return compareValues(a[type], b[type]);
    });

    this.setState(() => {
      if(order === 'asc'){
        return { playerlist: sortedplayers }
      }
      else{
        return { playerlist: sortedplayers.reverse() }
      }

    });
  }

  render() {
    const teams = this.state.teams;
    const playerlist = this.state.playerlist;

    return (
      <div className="App">
        <Header />
        {playerlist === [] &&
          <div className="bubblingG">
          	<span id="bubblingG_1">
          	</span>
          	<span id="bubblingG_2">
          	</span>
          	<span id="bubblingG_3">
          	</span>
          </div>
        }
        {playerlist !== []  &&
          <div style={{animation: "fadeIn 2s"}}>
            <TotalPlayers count={playerlist.length} />
            <StickyContainer >
              <Sticky relative={true} topOffset={0} disableCompensation>
                {
                  () => {
                    return (
                      <div className="player-sorters-wrapper">
                        <div className="player-sorters">
                          <PlayerSorter sort={"name"} onSorting={(type, order) => this.handlePlayersSort(type, order)} label="Name" />
                          <PlayerSorter sort={"nationality"} onSorting={(type, order) => this.handlePlayersSort(type, order)} label="Nationality" />
                          <PlayerSorter sort={"position"} onSorting={(type, order) => this.handlePlayersSort(type, order)} label="Position" />
                          <PlayerSorter sort={"jerseyNumber"} onSorting={(type, order) => this.handlePlayersSort(type, order)} label="Number" />
                          <PlayerSorter sort={"team"} onSorting={(type, order) => this.handlePlayersSort(type, order)} label="Team" />
                        </div>
                      </div>
                    );
                  }
                }
              </Sticky>
              <PlayerList players={playerlist}/>
            </StickyContainer >
          </div>
        }
      </div>
    );
  }
}

export default App;
