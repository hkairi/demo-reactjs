import React, { Component } from 'react';

class SearchForm extends Component {
  render(){
    return(
      <input type="text"
             placeholder="Que recherchez-vous ?"
             onChange={(e) => this.props.onSearch(e.target.value)} />
    );
  }
}

export default SearchForm;
