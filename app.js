const express = require('express');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const noteData = require('./db/db.json');


const PORT = 8080;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Function to handle route errors to html pages
function errorHandle(err) {
  res.writeHead(404);
  console.log(err);
  response.end();
}

 // HTML route -> GET Home
 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './public/index.html'));
 });

 // HTML route -> GET note form
 app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
 });

// API route -> GET note (json)
 app.get('/api/notes', (req, res) => {
  res.json(noteData);
 });

 // POST new note data to api
 app.post('/api/notes', (req, res) => {
   noteData.push(req.body);
   res.json(true);
 });


// Setup server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


// App building Workflow

// Define the get/post routes (HTML / API) ~ DONE
// Define the DELETE route
// IDs -> create function logic to add ID to req.body 
// connect getting the input form note data from user input to the post to db POST route 
// Add error handling


//// EXTRA ##### FIGURE OUT A WAY TO REMEMBER THIS
//// Purpose => Sets up the Express app to handle data parsing

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
