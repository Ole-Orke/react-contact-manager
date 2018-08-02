import React, { Component } from 'react';
import logo from './logo.svg';
import ContactList from "./components/contactList.js";
import './App.css';

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
