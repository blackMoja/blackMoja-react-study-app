import { atom } from 'recoil';

type ToDoType = {
  id: number;
  text: string;
  category: 'DONE' | 'DOING' | 'TO_DO';
};

const toDoState = atom<ToDoType[]>({ key: 'toDo', default: [] });

export type { ToDoType };
export { toDoState };
