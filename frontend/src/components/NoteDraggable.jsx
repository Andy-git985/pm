import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 3px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export const NoteDraggable = ({ note, index }) => {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps} />
          {note.title}
        </Container>
      )}
    </Draggable>
  );
};
