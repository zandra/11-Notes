const express = require('express');
const path = require('path');
const referrerPolicy = require('referrer-policy')
const fs = require('fs');
const noteJSON = require('./db/db.json');
const PORT = 8080;

const app = express();

// ####### view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 
// #######

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));

// User middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(referrerPolicy({ policy: 'unsafe-url' }));

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
   ////pug view
  // res.render('noteForm', {title: 'Notes'});
  //// 
  res.sendFile(path.join(__dirname, './public/notes.html'));
 });

// ####### view engine pug poc
//  app.get('/pug', (req, res) => {
//    res.render('pug', {title: 'Pug Notes'});
//  })

// API route => GET all notes (json)
 app.get('/api/notes', (req, res) => {
  res.json(noteJSON);
 });

 // API route => POST new note data to api
 app.post('/api/notes', (req, res) => {

  // get Id of last note if it exists or 0
  const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
  const id = lastId + 1;
  noteJSON.push( { id, ...req.body} );
  res.json(noteJSON.slice(-1));
 });

 // API route => DELETE note by ID 
 app.delete('/api/notes/:id', (req, res) => {
 let note = noteJSON.find( ({ id }) => id === JSON.parse(req.params.id));
 // removes object at index of note id
 noteJSON.splice( noteJSON.indexOf(note), 1);
res.end("Note deleted");
});

 // ## Delete this route before final app
 // API route => GET note by ID 
 app.get('/api/notes/note/:id', (req, res) => {
  let note = noteJSON.find( ({ id }) => id === JSON.parse(req.params.id));
  res.json(note);
 });


// ###### Server ######
// Setup server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
