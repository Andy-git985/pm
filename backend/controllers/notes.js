const notesRouter = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');

notesRouter.get('/', async (request, response) => {
  console.log(request.headers);
  const notes = await Note.find({ user: request.user });
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

notesRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user);
  const note = await Note.findById(request.params.id);
  if (note.user.toString() === user.id.toString()) {
    await Note.findByIdAndDelete(request.params.id);
    const index = user.notes.findIndex(
      (note) => String(note) === request.params.id
    );
    user.notes.splice(index, 1);
    await user.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'unauthorized user' });
  }
});

module.exports = notesRouter;
