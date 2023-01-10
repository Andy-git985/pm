const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  folder: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
  },
  progress: {
    type: String,
  },
  files: [
    {
      cloudinaryId: {
        type: String,
      },
      fileType: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  access: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  edits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now },
    },
  ],
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
