const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST request to save contact form data
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send('Contact info saved successfully!');
    } catch (error) {
        res.status(400).send('Error saving contact info: ' + error.message);
    }
});

module.exports = router;
