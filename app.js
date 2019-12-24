const express = require('express');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const noteJSON = require('./db/db.json');


const PORT = 8080;

const app = express();

// User middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Function to handle route errors to html pages
function errorHandle(err) {
  res.writeHead(404);
  console.log(err);
  response.end();
}

// ##### ROUTES #########

 // HTML route -> GET Home
 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './public/index.html'));
 });

 // HTML route => GET note form
 app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
 });

// API route => GET all notes (json)
 app.get('/api/notes', (req, res) => {
  res.json(noteJSON);
 });

 // API route => POST new note data to api
 app.post('/api/notes', (req, res) => {
  const id =  noteJSON.length ? noteJSON.length+1 : 1;
  noteJSON.push( { id, ...req.body} );
   res.json(true);
 });

 // API route => GET note by ID
 app.get('/api/notes/:id', (req, res) => {
   res.json(noteJSON[req.params.id]);
 });

// ######### Server 
// Setup server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
