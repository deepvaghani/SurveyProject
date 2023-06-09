const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3001' // Replace with your frontend URL
};

// Apply the cors middleware
app.use(cors(corsOptions));

// MongoDB Atlas connection string
const uri = 'mongodb+srv://deepvaghani58:Deep2023@surveydb.3s9yqz7.mongodb.net/surveyCollection?retryWrites=true&w=majority';

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// Create a schema for the survey data
const surveySchema = new mongoose.Schema({
    devices: [String],
    operatingSystem: String,
    technologyUsage: String,
    noteTakingApps: [String],
    internetConnectivity: Number,
    onlineLearningPlatforms: String,
});


// Create a model based on the survey schema
const Survey = mongoose.model('Survey', surveySchema);

const surveySchema1 = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
    },
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
});


// Create a model based on the survey schema
const Survey1 = mongoose.model('Survey1', surveySchema1);

// Define an API endpoint to handle saving survey data
app.post('/api/surveyCollection', (req, res) => {
    const surveyData = req.body;
    const newSurvey = new Survey(surveyData);

    newSurvey.save()
        .then(() => {
            console.log('Survey data saved successfully');
            const ip = req.ip;
            console.log(ip);
            res.status(200).json({ message: 'Survey data saved successfully' });
        })
        .catch((error) => {
            console.error('Error saving survey data:', error);
            res.status(500).json({ error: 'An error occurred while saving survey data' });
        });
});

app.post('/api/survey', (req, res) => {
    const surveyData1 = req.body;
    const newSurvey1 = new Survey1(surveyData1);

    newSurvey1.save()
        .then(() => {
            console.log('Survey data saved successfully');
            const ip = req.ip;
            console.log(ip);
            res.status(200).json({ message: 'Survey data saved successfully' });
        })
        .catch((error) => {
            console.error('Error saving survey data:', error);
            res.status(500).json({ error: 'An error occurred while saving survey data' });
        });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


