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

class ContactList extends Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: dummyData
    }
  }

  render() {
    const contactListStyle = {
      marginTop: "20px",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      fontSize: "20px"
    };
    const tableStyle = {
      width: "80%"
    }
    return (
      <div style={contactListStyle}>
        <table style={tableStyle} className="table">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Phone
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact) => <tr key={contact.name + contact.number}>
              <td>
                {contact.name}
              </td>
              <td>
                {contact.phone}
              </td>
              <td>
                <button className="btn btn-dark">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>)}
            <tr>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control">
                  </input>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control">
                  </input>
                </div>
              </td>
              <td>
                <button className="btn btn-primary">Add contact</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
