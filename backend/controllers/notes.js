const notesRouter = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const { title, content, folder, dueDate, priority, progress, files } =
    request.body;
  const user = await User.findById(request.user);
  const note = new Note({
    title,
    content,
    folder,
    dueDate,
    priority,
    progress,
    files,
    createdAt: new Date(),
    user,
  });
  await note.save();
  user.notes = user.notes.concat(note._id);
  await user.save();

  response.status(201).json(note);
});

module.exports = notesRouter;
