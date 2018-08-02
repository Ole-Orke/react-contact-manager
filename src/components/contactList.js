import React, { Component } from 'react';

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
