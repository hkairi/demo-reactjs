import React, { Component } from 'react';

class UserList extends Component {

  renderUsers(users, callback){
    return(
      users.map( user => {
        return(
          <li key={user.id}>
            <input type="checkbox" onClick={() => callback(user.id)}/> { user.userName }
          </li>
        )
      })
    );
  }

  render(){
    return(
      <ul id="user-list">
        { this.renderUsers(this.props.users, this.props.userSelected) }
      </ul>
    )
  }

}

export default UserList;
