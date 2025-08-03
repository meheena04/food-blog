const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB Atlas-pwd is 1234
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Create a schema for your data
const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  dob: String,
  gender: String,
  contact: String,
  email: String,
  subject: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submission
app.post('/register', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.send('Message received! We will get back to you soon.');
  } catch (err) {
    res.status(500).send('Error processing your request');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
