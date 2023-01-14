const notesRouter = require('express').Router();
const { response } = require('express');
const Note = require('../models/Note');
const User = require('../models/User');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const { title, content, folder, dueDate, priority, progress, files } =
    request.body;
  const note = new Note({
    title,
    content,
    folder,
    dueDate,
    priority,
    progress,
    files,
    createdAt: new Date(),
  });
  await note.save();
  console.log('new note', note);
  response.status(201).json(note);
});

module.exports = notesRouter;
