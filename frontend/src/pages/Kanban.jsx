import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateNote } from '../reducers/noteReducers';
import fieldData from '../data';
import Column from '../components/Column';
import AppBarFinal from '../components/AppBarFinal';

const Container = styled.div`
  display: flex;
`;
const Kanban = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes }) => notes);
  const filter = useSelector(({ filter }) => filter);
  console.log(filter);
  const notesByFolder =
    filter.filterBy === 'folder'
      ? notes.filter((note) => note.folder === filter.notes)
      : notes;
  const progress = fieldData.progress;
  const filteredNotes = progress.map((p) =>
    notesByFolder.filter((n) => n.progress === p.value)
  );
  const dragType = 'progress';

  // const [data, setData] = useState(filteredNotes);

  const onDragEnd = (result) => {
    const { destination, draggableId, type } = result;
    if (!destination) return;
    const newProgress = progress.find((obj) =>
      Object.values(obj).includes(destination.droppableId)
    ).value;
    const updatedField = { [type]: newProgress };
    dispatch(updateNote(draggableId, updatedField));
  };
  return (
    <>
      <AppBarFinal />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {filteredNotes.map((column, index) => {
            return (
              <Column
                key={`${progress[index]}-${index}`}
                title={progress[index]}
                notes={column}
                index={index.toString()}
                type={dragType}
              />
            );
          })}
        </Container>
      </DragDropContext>

      {/* same deal
      filteredNotes.map(aOfa) => {
        aOfa.map(a) => {
          return (
            // might need to move outer
            <div class="flex">
            <Column>
            </div>
          )
        }
        */}

      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="progress">
          {(provided) => (
            <ColumnContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((d, index) => {
                return (
                  <Draggable key={d.id} draggableId={d.id} index={index}>
                    {(provided) => (
                      <ColumnContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {d.title}
                      </ColumnContainer>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ColumnContainer>
          )}
        </Droppable>
      </DragDropContext> */}
    </>
  );
};

export default Kanban;
