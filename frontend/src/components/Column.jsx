import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { NoteDraggable as Note } from './NoteDraggable';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const NoteList = styled.div`
  padding: 8px;
  transiton: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = ({ title, notes, type }) => {
  return (
    <Container>
      <Title>{title.name}</Title>
      <Droppable droppableId={title.name} type={type}>
        {(provided, snapshot) => (
          <NoteList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {notes.map((note, index) => (
              <Note key={note.id} note={note} index={index} />
            ))}
            {provided.placeholder}
          </NoteList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
