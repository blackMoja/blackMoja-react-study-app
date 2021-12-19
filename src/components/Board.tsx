import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { toDoState } from 'atoms';
import DraggableCard from './DraggableCard';

import type { FC } from 'react';
import type { ToDo } from 'atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

type AreaProps = {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
};
const Area = styled.div<AreaProps>`
  background-color: ${props =>
    props.$isDraggingOver
      ? '#dfe6e9'
      : props.$isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

type Props = {
  toDos: ToDo[];
  boardId: string;
};

type FormType = {
  toDo: string;
};

const Board: FC<Props> = ({ boardId, toDos }) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<FormType>();

  const handleFormValid = (data: FormType) => {
    const newToDo = {
      id: Date.now(),
      text: data.toDo,
    };

    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(handleFormValid)}>
        <input
          type="text"
          placeholder={`Add task on ${boardId}`}
          {...register('toDo', { required: true })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(droppableOptions, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={droppableOptions.innerRef}
            {...droppableOptions.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {droppableOptions.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
