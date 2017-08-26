import React from 'react';

class PlayerSorter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sort: "desc"
    }

    this.handleSort = this.handleSort.bind(this);
  }

  handleSort() {
    //Scroll to top on PlayerList update
    document.getElementsByClassName("player-list")[0].scrollTop = 0;

    this.setState(() => {
      if(this.state.sort === 'desc'){
        this.props.onSorting(this.props.sort, "asc");
        return {sort: 'asc'}
      }
      else{
        this.props.onSorting(this.props.sort, "desc");
        return {sort: 'desc'}
      }
    })
  }

  render(){
    return(
      <div className="player-sorter-cont">
        <span className="sort-label">{this.props.label}</span>
        <div onClick={this.handleSort} className="player-sorter"></div>
      </div>
    );
  }
}

export default PlayerSorter;
