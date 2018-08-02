import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const dummyData = [{name: "Bob Dylan", phone: 123232}, {name: "Mila Kunis", phone: 4343434}, {name: "Bob Ross", phone: 33333}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Contact manager</h1>
        </header>
        <ContactList />
      </div>
    );
  }
}

export default App;
