import React, { Component } from 'react';
const USERS = require('./data.js');

class TodoList extends Component {
  showItems(todos, callback){
    return todos.map((todo, index) => {
      const text = todo.done ? "à refaire" : "fait";
      const userName = USERS.filter(
        user => user.id === parseInt(todo.userId, 10)
      )[0].userName;

      return(
        <li className='todo' key={'todo-' + index}>
          {todo.text} assigné à : {userName}
          <button onClick={() => callback(todo.id) }>{ text }</button>
        </li>
      )
    });
  }

  render(){
    const todos = this.props.todos;
    const callback = this.props.markAsDone;

    return(
      <div>
        <ul id="todo-list">
          <p>{this.props.title}: [{todos.length}]</p>
          { this.showItems(todos, callback) }
        </ul>
      </div>
    );
  }
}

export default TodoList;
