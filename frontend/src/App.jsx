import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteForm from './components/NoteForm';
import { initializeNotes } from './reducers/noteReducers';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  const notes = useSelector(({ notes }) => notes);

  return (
    <>
      <NoteForm />
      {notes.map((note, index) => (
        <div key={index}>{note.content}</div>
      ))}
    </>
  );
};
export default App;
