import React, { Component } from 'react';

class ContactList extends Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      displayContacts: [],
      inputName: "",
      inputPhone: "",
      editing: false,
      editId: "",
      inputSearch: ""
    }
  }

  inputNameChange(event) {
    this.setState({
      inputName: event.target.value,
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

  inputSearchChange(event) {
    let contacts = this.state.contacts;
    let search = event.target.value;
    contacts = contacts.filter((contact) => {
      return (contact.name.toLowerCase().indexOf(search) !== -1);
    });
    this.setState({
      displayContacts: contacts,
      inputSearch: event.target.value,
    });
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
          contacts: resp.contacts,
          displayContacts: resp.contacts
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
    this.getContacts();
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

  startEdit(event) {
    const arr = event.target.value.split("/");
    console.log(arr);
    const name = arr[0];
    const phone = arr[1];
    const id = arr[2];
    this.setState({
      inputName: name,
      inputPhone: phone,
      editing: true,
      editId: id
    });
  }

  stopEdit() {
    this.setState({
      editing: false,
      inputName: "",
      inputPhone: ""
    });
  }

  editContact() {
    fetch('/api/editContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.inputName,
        phone: this.state.inputPhone,
        id: this.state.editId
      }),
    })
    .then((res) => res.json())
    .then((resp) => {
      if(resp.success) {
        console.log("Contact edited");
        this.getContacts();
        this.setState({
          editing: false,
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

  render() {
    const contactListStyle = {
      marginTop: "20px",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      fontSize: "20px"
    };
    const tableStyle = {
      width: "80%",
      justifyContent: "center",
    }
    return (
      <div style={contactListStyle}>
        <table style={tableStyle} className="table">
          <thead>
            <tr>
              <td>
                <span className="form-group">
                  Search:
                  <input onChange={(event) => this.inputSearchChange(event)} value={this.state.inputSearch} className="form-control">
                  </input>
                </span>
              </td>
            </tr>
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
            {this.state.displayContacts.map((contact) => <tr key={contact._id}>
              <td>
                {contact.name}
              </td>
              <td>
                {contact.phone}
              </td>
              <td>
                <button value={contact.name + "/" + contact.phone + "/" + contact._id} onClick={(event) => this.startEdit(event)} className="btn btn-dark">Edit</button>
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
                {this.state.editing ? <div><button onClick={() => this.editContact()} className="btn btn-primary">Edit</button><button onClick={() => this.stopEdit()} className="btn btn-danger">Cancel</button></div> : <button onClick={() => this.addContact()} className="btn btn-primary">Add contact</button>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ContactList;
