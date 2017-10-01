import React, { Component } from 'react';
import './App.css';
import './animate.min.css';
import Shortener from './Shortener';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>280 is the new 140</h1>
        </header>

        <Shortener />

      </div>
    );
  }
}

export default App;
