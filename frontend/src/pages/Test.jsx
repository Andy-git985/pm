import data from '../data';
import styled from 'styled-components';

const testData = data.testData;

const Container = styled.div`
  display: flex;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  width: 275px;
`;

const NotesContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const NoteList = styled.div`
  padding: 8px;
  transiton: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const NoteContainer = styled.div`
  border: 3px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  display: flex;
`;

const Note = ({ note }) => {
  return (
    <>
      <NoteContainer>{note.title}</NoteContainer>
      {/* <NoteContainer>Progress: {note.progress}</NoteContainer>
      <NoteContainer>Priority: {note.priority}</NoteContainer> */}
    </>
  );
};

const Column = ({ notes }) => {
  return (
    <>
      <NotesContainer>
        <h3>{notes[0].priority}</h3>
        {notes.map((note) => (
          <NoteList>
            <Note key={note.id} note={note} />
          </NoteList>
        ))}
      </NotesContainer>
    </>
  );
};

const Test = () => {
  return (
    <Container>
      {testData.map((arrOfArr) => {
        return (
          <ColumnContainer>
            <h2>{arrOfArr[0][0].progress}</h2>
            {arrOfArr.map((notes) => (
              <Column notes={notes} />
            ))}
          </ColumnContainer>
        );
      })}
    </Container>
  );
};

export default Test;
