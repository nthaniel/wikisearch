import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(searchterm) {
    this.props.submitHandler(searchterm);
  }

  handleChange(e) {
    this.handleSubmit(e.target.value);
  }

  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault(); 
        this.handleSubmit(this.props.value);
      }}>  
        <input 
          className='search'
          type='text' 
          autoFocus='true' 
          value={this.props.value} 
          placeholder='Search here' 
          onChange={this.handleChange}
        />
      </form>
    );
  }

}

export default Searchbar;
