import React from 'react';

class Filter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checked: true
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  //Updates PlayerList state in App
  handleCheck() {
    this.setState(() => {
      return {checked: !this.state.checked}
    });

    this.props.onCheck(this.state.checked, this.props.name, this.props.group);
  }

  render(){
    return(
      <div className="filter">
        <label>{this.props.name}</label>
        <input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleCheck} />
      </div>
    );
  }
}

export default Filter;
