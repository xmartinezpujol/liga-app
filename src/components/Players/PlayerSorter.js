import React from 'react';

class PlayerSorter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sort: "desc"
    }

    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(order) {
    //Scroll to top on PlayerList update
    document.getElementsByClassName("player-list")[0].scrollTop = 0;

    this.setState(() => {
      if(order){
        this.props.onSorting(this.props.sort, order, this.props.id);
        return {sort: order}
      }
      else{
        if(this.state.sort === 'desc'){
          this.props.onSorting(this.props.sort, "asc", this.props.id);
          return {sort: 'asc'}
        }
        else{
          this.props.onSorting(this.props.sort, "desc", this.props.id);
          return {sort: 'desc'}
        }
      }
    })
  }

  render(){
    return(
      <div className="player-sorter-cont">
        <span className="sort-label">{this.props.label}</span>
        {this.props.active &&
          <div onClick={() => this.handleSort()} className={`player-sorter-${this.state.sort}`}></div>
        }
        {!this.props.active &&
          <div>
            <div onClick={() => this.handleSort("desc")} className="player-sorter-inactive player-sorter-desc" ></div>
            <div onClick={() => this.handleSort("asc")} className="player-sorter-inactive player-sorter-asc" ></div>
          </div>
        }
      </div>
    );
  }
}

export default PlayerSorter;
