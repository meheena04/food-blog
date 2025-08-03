const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('add/link/to/mongodb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Models
const Contact = require('./models/contact');

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// New route for handling form submission
app.post('/register', async (req, res) => {
    try {
        const { name, age, dob, gender, contact, email, subject, message } = req.body;

        // Create a new Contact document
        const newContact = new Contact({
            name,
            age,
            dob,
            gender,
            contact,
            email,
            subject,
            message
        });

        // Save the newContact to the database
        await newContact.save();

        res.status(201).send('Contact information saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while saving contact information');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

