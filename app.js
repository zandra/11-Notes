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

// ##### ROUTES #####

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
  const ids = noteJSON.map(note => note.id);
  res.json(noteJSON);
 });

 // API route => POST new note data to api
 app.post('/api/notes', (req, res) => {

  // get Id of last note if it exists or 0
  const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
  const id = lastId + 1;
  noteJSON.push( { id, ...req.body} );
  res.json(true);
 });


 // API route => DELETE note by ID 
 app.delete('/api/notes/:id', (req, res) => {
//find note to be deleted
res.end("DELETE ME");
});

 // ## Delete this route before final app
 // API route => GET note by ID 
 app.get('/api/notes/note/:id', (req, res) => {
  const del = noteJSON.map(n => n.id);
  console.log(req.params.id);
  const note = noteJSON.filter(n => n.id === JSON.parse(req.params.id));
  res.json(note);
 });



// ###### Server ######
// Setup server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
