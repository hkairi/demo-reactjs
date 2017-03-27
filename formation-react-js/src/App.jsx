import React, { Component } from 'react';
import './App.css';

import TodoForm   from './todoForm.js';
import TodoList   from './todoList.js';
import SearchForm from './searchForm.js';
import UserList   from './userList.js';

const USERS = require('./data.js');

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      todos: [],
      todosAafficher: [],
      query: '',
      selectedUsers: [],
      loading: false
    };

    this.addTodo    = this.addTodo.bind(this);
    this.markAsDone = this.markAsDone.bind(this);
    this.onSearch   = this.onSearch.bind(this);
    this.userSelected = this.userSelected.bind(this);
  }

  addTodo(todo){
    var _todos = this.state.todos;
    todo.id = _todos.length + 1;
    _todos.push(todo);
    this.setState({ todos: _todos });
  }
  markAsDone(todo_id){
    const _todos = this.state.todos;
    _todos.forEach(todo => {
      if(todo.id === todo_id){
        todo.done = !todo.done;
      }
    });
    this.setState({ todos: _todos });
  }

  makeFilter(attr, recherche){
    return (todo) => {
      return(
        todo[attr].toLowerCase().indexOf( recherche.toLowerCase()) !== -1
      );
    };
  }
  onSearch(recherche){
    const inTitle       = this.makeFilter('text', recherche);
    const inDescription = this.makeFilter('description', recherche);
    const autreFunc     = this.makeFilter('id', recherche);

    if(recherche!== ''){
      const _todos = this.state.todos.filter( todo => {
        return( inTitle(todo) || inDescription(todo) || autreFunc(todo) );
      });
      this.setState({ query: recherche, todosAafficher: _todos });
    }else{
      this.setState({ query: recherche });
    }
  }

  userSelected(user_id){
    var list = this.state.selectedUsers;
    if(list.indexOf(user_id) === -1){
      list.push(user_id);
    }else{
      list = list.filter( item => item !== user_id );
    }

    var _countries = [1, 3, 40, 6];
    // url construction for GET request
    const url = 'http://localhost:4000/api/index?';
    var params = 'countries=' + encodeURIComponent(_countries);
        params += '&users='   + encodeURIComponent(list);

    // start the loading ...
    this.setState({loading: true});
    fetch(url + params)
      .then(() => this.setState({loading: false}));

   // a 'better' way using POST
   // fetch('http://localhost:4000/api/backend', {
   //   method: 'POST',
   //   headers: { 'Content-Type': 'application/json' },
   //   body: JSON.stringify({ user_ids: list, countries: _countries })
   //  })
   //   .then( data => data.json() )
   //   .then( data => console.log(data) )
   //   .catch( err => console.log(err) );

    this.setState({ selectedUsers: list });
  }

  getTodoList(state){
    if(state.selectedUsers.length === 0){
      return( state.todos );
    }else{
      return(
        state.todos
             .filter(
               todo => state.selectedUsers.indexOf(parseInt(todo.userId, 10)) !== -1
             )
      );
    }
  }

  showLoader(loading){
    if(loading){
      return(
        <div>Chargement en cours ...</div>
      )
    };
  }

  render() {
    const todos = this.getTodoList(this.state);

    return (
      <div className="App">
        <div className="App-header">
          <TodoForm onNewTodo={this.addTodo} users={USERS}/>
        </div>

        <SearchForm onSearch={this.onSearch}/>

        { this.showLoader(this.state.loading) }

        <div className="App-intro">
          <UserList users={USERS} userSelected={this.userSelected}/>
          <TodoList title="Todos" todos={todos} markAsDone={this.markAsDone}/>
        </div>
      </div>
      );
  }
}

export default App;
