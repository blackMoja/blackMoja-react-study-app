import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import type { FC } from 'react';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const toDos = ['a', 'b', 'c', 'e', 'f'];

const App: FC = () => {
  const handleDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {droppableOptions => (
              <Board
                ref={droppableOptions.innerRef}
                {...droppableOptions.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <Draggable draggableId={toDo} index={index}>
                    {draggableOptions => (
                      <Card
                        ref={draggableOptions.innerRef}
                        {...draggableOptions.draggableProps}
                        {...draggableOptions.dragHandleProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {droppableOptions.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
