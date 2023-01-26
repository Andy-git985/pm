import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import fieldData from '../data';
import Column from '../components/Column';
import AppBarFinal from '../components/AppBarFinal';

const Container = styled.div`
  display: flex;
`;

const Kanban = () => {
  const notes = useSelector(({ notes }) => notes);
  const filter = useSelector(({ filter }) => filter);
  const notesByFolder =
    filter.filterBy === 'folder'
      ? notes.filter((note) => note.folder === filter.notes)
      : notes;
  const progress = fieldData.progress;
  const noteState = progress.map((p) =>
    notesByFolder.filter((n) => n.progress === p.value)
  );
  const [data, setData] = useState(noteState);

  const onDragStart = (start) => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };
  return (
    <>
      <AppBarFinal />
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="all-collumns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {noteState.map((notes, index) => {
                return (
                  <Column
                    key={notes.id}
                    column={progress[index]}
                    notes={notes}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Kanban;
