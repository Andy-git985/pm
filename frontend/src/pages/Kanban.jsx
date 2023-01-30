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
  const dispatch = useDispatch();
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
    const { destination, source, draggableId, type } = result;
    console.log(result);
    console.log('draggableId', draggableId);
    console.log(source.droppableId);
    console.log(source.index);
    console.log(destination.droppableId);
    if (!destination) return;
    const newOrder = Array.from(data);
    console.log(newOrder);

    // const [[reorderedNote]] = newOrder.splice(source.index, 1);
    // console.log(reorderedNote);

    // newOrder.splice(destination.index, 0, reorderedNote);
    // setData(newOrder);

    // const newObj = { ...reorderedNote };

    // newObj.progress = progress.find((obj) =>
    //   Object.values(obj).includes(destination.droppableId)
    // ).value;
    // dispatch(updateNote(draggableId, newObj));
    // return;
  };
  return (
    <>
      <AppBarFinal />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {data.map((column, index) => {
            return <Column title={progress[index]} notes={column} />;
          })}
        </Container>
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
