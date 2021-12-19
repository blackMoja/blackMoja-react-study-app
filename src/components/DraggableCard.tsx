import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import type { FC } from 'react';

const Card = styled.div<{ $isDragging: boolean }>`
  background-color: ${props =>
    props.$isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${props =>
    props.$isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.5 )' : 'none'};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

type Props = {
  toDoId: number;
  toDoText: string;
  index: number;
};

const DraggableCard: FC<Props> = ({ toDoId, toDoText, index }) => {
  return (
    <Draggable draggableId={String(toDoId)} index={index}>
      {(draggableOptions, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={draggableOptions.innerRef}
          {...draggableOptions.draggableProps}
          {...draggableOptions.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);
