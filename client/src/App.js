import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

import Container from 'react-bootstrap/Container';
import NoteNew from './components/NoteNew/NoteNew';
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
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //     <p>{this.state.response}</p>
    //     <form onSubmit={this.handleSubmit}>
    //       <p>
    //         <strong>Post to Server:</strong>
    //       </p>
    //       <input
    //         type="text"
    //         value={this.state.post}
    //         onChange={e => this.setState({ post: e.target.value })}
    //       />
    //       <button type="submit">Submit</button>
    //     </form>
    //     <p>{this.state.responseToPost}</p>
    //     <form onSubmit={this.handleSubmit}>
    //       <p>
    //         <strong>Post to Server:</strong>
    //       </p>
    //       <input
    //         type="text"
    //         value={this.state.post}
    //         onChange={e => this.setState({ post: e.target.value })}
    //       />
    //       <button type="submit">Submit</button>
    //     </form>
    //   </div>
    //<StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Container>
          <Route exact path="/" component={NoteNew} />
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