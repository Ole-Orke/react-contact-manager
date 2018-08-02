import React, { Component } from 'react';

class ContactList extends Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      inputName: "",
      inputPhone: ""
    }
  }

  inputNameChange(event) {
    this.setState({
      inputName: event.target.value
    });
  }

  inputPhoneChange(event) {
    if(parseInt(event.target.value)) {
      this.setState({
        inputPhone: event.target.value
      });
    }
    else {
      this.setState({
        inputPhone: ""
      });
    }
  }

  getContacts() {
    fetch('/api/getContacts', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=> {
      if(res.status === 200) {
        return res.json();
      } else {
        console.log("Erro GETting contacts");
        return res.json();
      }
    })
    .then((resp) => {
      if (resp.error) {
        console.log(resp.error);
      }
      else {
        this.setState({
          contacts: resp.contacts
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getContacts();
  }

  addContact() {
    fetch('/api/addContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.inputName,
        phone: this.state.inputPhone,
      }),
    })
    .then((res) => res.json())
    .then((resp) => {
      if(resp.success) {
        console.log("Contact added!");
        this.setState({
          contacts: this.state.contacts.concat({
            name: this.state.inputName,
            phone: this.state.inputPhone
          }),
          inputName: "",
          inputPhone: ""
        });
      }
      else {
        console.log(resp.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteContact(event) {
    fetch('/api/deleteContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.value
      }),
    })
    .then((res) => res.json())
    .then((resp) => {
      if(resp.success) {
        console.log("Contact deleted!");
        this.getContacts();
      }
      else {
        console.log(resp.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
                <button value={contact.name} className="btn btn-dark">Edit</button>
                <button onClick={(event) => this.deleteContact(event)} value={contact.name} className="btn btn-danger">Delete</button>
              </td>
            </tr>)}
            <tr>
              <td>
                <div className="form-group">
                  <input onChange={(event) => this.inputNameChange(event)} value={this.state.inputName} className="form-control">
                  </input>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input onChange={(event) => this.inputPhoneChange(event)} value={this.state.inputPhone} className="form-control">
                  </input>
                </div>
              </td>
              <td>
                <button onClick={() => this.addContact()} className="btn btn-primary">Add contact</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ContactList;
