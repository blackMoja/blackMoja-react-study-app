import { atom } from 'recoil';

type ToDo = {
  id: number;
  text: string;
};

type ToDoState = {
  [key: string]: ToDo[];
};

const toDoState = atom<ToDoState>({
  key: 'toDo',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
});

export type { ToDo };
export { toDoState };
