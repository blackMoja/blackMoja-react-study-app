import { useSetRecoilState } from 'recoil';
import { Categories, toDoState } from 'atoms';

import type { FC, MouseEvent } from 'react';
import type { ToDoType } from 'atoms';

const ToDo: FC<ToDoType> = ({ text, category, id }) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ''} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ''} onClick={onClick}>
          To DO
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ''} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
