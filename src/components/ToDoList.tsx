import { useRecoilValue } from 'recoil';
import { toDoState } from 'atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

import type { FC } from 'react';

const ToDoList: FC = () => {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map(({ id, text, category }) => (
          <ToDo key={id} id={id} text={text} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
