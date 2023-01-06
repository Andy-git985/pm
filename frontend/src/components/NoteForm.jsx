import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducers';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input name="note" placeholder="write note content here" />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
