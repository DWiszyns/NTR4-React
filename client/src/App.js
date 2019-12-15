import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import NoteNew from './components/NoteNew/NoteNew';
import NoteList from './components/NoteList/NoteList';
import NoteEdit from './components/NoteEdit/NoteEdit';
import {StateProvider} from "./state";
import moment from 'moment'


import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { StateProvider } from './state';

class App extends Component {
  state = {
    page: 1,
    category: '',
    dateFrom:  moment(new Date().setMonth(2)).format("YYYY-MM-DD"),
    dateTo:  moment(new Date()).format("YYYY-MM-DD")
  };

  initialState = {
    category: '',
    page: 1,
    dateFrom:  moment(new Date().setMonth(2)).format("YYYY-MM-DD"),
    dateTo:  moment(new Date()).format("YYYY-MM-DD")
  };
  
  componentDidMount() {

  }
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  reducer = (state, action) => {
    switch (action.type) {
      case 'changePage':
        return {
          ...state,
          page: action.newPage,
        };
      case 'changeCategoryFilter':
        return {
          ...state,
          category: action.newCategory,
        };
      case 'changeStartDate':
        return {
          ...state,
          startDate: action.newStartDate,
        };
      case 'changeEndDate':
        return {
          ...state,
          endDate: action.newEndDate,
        };
      default:
        return state;
    }
  };
  
render() {
    return (
    <StateProvider initialState={this.initialState} reducer={this.reducer}>
      <Router>
        <Container>
          <Route exact path="/notes/new" component={NoteNew} />
          <Route exact path="/notes/edit/:title" component={NoteEdit} />
          <Route exact path="/" component={NoteList} />
        </Container>
      </Router>
    </StateProvider>
    );
  }
}

export default App;

// import NotesContainer from './containers/NotesContainer';
// import NoteContainer from './containers/NoteContainer';
/* <Route exact path="/notes/edit/:title" component={NoteContainer} />
          <Route exact path="/notes/new" component={NoteNew} /> */