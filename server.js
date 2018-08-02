const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const Contact = require("./src/models.js").Contact;
app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (error) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Success! Connected to MongoDB!");
  }
});

app.use(bodyParser.json());

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.post("/api/addContact", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  if (name && phone) {
    const newContact = new Contact({
      name: name,
      phone: phone
    });
    newContact.save((error) => {
      if(error) {
        res.status(500).json({
          error: "Failed to save Contact"
        });
      }
      else {
        res.status(200).json({
          success: true
        });
      }
    });
  }
  else {
    res.json({
      error: "Missing parameters"
    });
  }
});

app.get("/api/getContacts", (req, res) => {
  Contact.find((error, contacts) => {
    if(error) {
      console.log(error);
      res.status(500).json({
        error: "Could not retrieve contacts"
      });
    }
    else {
      res.status(200).json({
        success: true,
        contacts: contacts
      });
    }
  });
});

app.post("/api/deleteContact", (req, res) => {
  const name = req.body.name;
  Contact.findOneAndRemove({name: name}, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "Could not delete contact"
      });
    }
    else {
      res.status(200).json({
        success: true
      });
    }
  });
});

app.post("/api/editContact", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;
  Contact.findByIdAndUpdate(id, {name: name, phone: phone}, (error) => {
    if(error) {
      console.log(error);
      res.status(400).json({
        error: "Failed to update contact"
      });
    }
    else {
      res.status(200).json({
        success: true
      });
    }
  });
});

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
