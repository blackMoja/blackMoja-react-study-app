import { atom, selector } from 'recoil';

enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

type ToDoType = {
  id: number;
  text: string;
  category: Categories;
};

const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

const INIT_DATA = JSON.parse(window.localStorage.getItem('toDoList') || '[]');
const toDoState = atom<ToDoType[]>({
  key: 'toDo',
  default: INIT_DATA,
});

const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter(toDo => toDo.category === category);
  },
});

export type { ToDoType };
export { toDoState, categoryState, toDoSelector, Categories };
