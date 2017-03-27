import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: 0
    };
    this.createTodo = this.createTodo.bind(this);
  }

  createTodo(e){
    e.preventDefault();
    const userID = this.state.user_id;
    if (userID !== 0){
      var _todo = {
        id: null,
        text: this.todoInput.value,
        description: this.todoDescription.value,
        done: false,
        userId: userID,
        createAt: new Date()
      };

      this.props.onNewTodo(_todo);
      this.todoInput.value = '';
    }else{
      alert("Djo ... choisis un utilisateur ...");
    }
  }

  showUsers(users){
    return users.map( user => {
      return(
        <option value={user.id} key={'user-' + user.id}>
          {user.userName}
        </option>
      )
    });
  }

  render(){
    return(
      <div id="todo-form">
        <input type="text"
          placeholder="Description de la tâche.."
          ref={(input) => this.todoInput = input }
          />
        <input type="text"
          placeholder="plus d'infos"
          ref={(description) => this.todoDescription = description }
          />

          <select onChange={(v) => this.setState({user_id: v.target.value})}>
            <option value="0">Choisir un utilisateur</option>
            { this.showUsers(this.props.users) }
          </select>
        <button onClick={this.createTodo}>Ajouter</button>
      </div>
    );
  }
}

export default TodoForm;
