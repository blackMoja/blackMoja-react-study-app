import type { FC } from 'react';
import type { ToDoType } from 'atoms';

const ToDo: FC<ToDoType> = ({ text }) => {
  return (
    <li>
      <span>{text}</span>
      <button>To DO</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
};

export default ToDo;
