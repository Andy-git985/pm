import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/notes';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
    updateNotes(state, action) {
      const updatedNote = action.payload;
      return state.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((post) => post.id !== id);
    },
  },
});

export const { appendNote, setNotes, remove, updateNotes } = noteSlice.actions;
export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};
export const createNote = (note) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(note);
    dispatch(appendNote(newNote));
  };
};
export const updateNote = (id, content) => {
  return async (dispatch) => {
    const updatedNote = await noteService.updateNote(id, content);
    dispatch(updateNotes(updatedNote));
  };
};
export const removeNote = (id) => {
  return async (dispatch) => {
    await noteService.removeNote(id);
    dispatch(remove(id));
  };
};
export default noteSlice.reducer;
