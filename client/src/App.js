import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import NoteNew from './components/NoteNew/NoteNew';
import NoteList from './components/NoteList/NoteList';
import NoteEdit from './components/NoteEdit/NoteEdit';


import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { StateProvider } from './state';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
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
  
render() {
    return (
    //<StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Container>
          <Route exact path="/notes/new" component={NoteNew} />
          <Route exact path="/notes/edit/:title" component={NoteEdit} />
          <Route exact path="/" component={NoteList} />
        </Container>
      </Router>
    //</StateProvider>
    );
  }
}

export default App;

// import NotesContainer from './containers/NotesContainer';
// import NoteContainer from './containers/NoteContainer';
/* <Route exact path="/notes/edit/:title" component={NoteContainer} />
          <Route exact path="/notes/new" component={NoteNew} /> */