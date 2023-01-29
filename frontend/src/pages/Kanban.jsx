import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fieldData from '../data';
import Column from '../components/Column';
import AppBarFinal from '../components/AppBarFinal';

const Container = styled.div`
  display: flex;
`;
const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Kanban = () => {
  const notes = useSelector(({ notes }) => notes);
  const filter = useSelector(({ filter }) => filter);
  const notesByFolder =
    filter.filterBy === 'folder'
      ? notes.filter((note) => note.folder === filter.notes)
      : notes;
  const progress = fieldData.progress;
  const filteredNotes = progress.map((p) =>
    notesByFolder.filter((n) => n.progress === p.value)
  );

  const [data, setData] = useState(filteredNotes);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const newOrder = Array.from(data);
    const [reorderedNote] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, reorderedNote);
    setData(newOrder);
    return;
  };
  return (
    <>
      <AppBarFinal />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-collumns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((column, index) => {
                return <Column title={progress[index]} notes={column} />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>

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
