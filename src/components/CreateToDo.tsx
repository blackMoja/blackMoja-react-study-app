import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from 'atoms';

import type { FC } from 'react';

type FormType = {
  toDo: string;
};

const CreateToDo: FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormType>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onSubmit = ({ toDo }: FormType) => {
    setToDos(oldToDos => {
      const toDoList = [...oldToDos, { id: Date.now(), text: toDo, category }];
      window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
      return toDoList;
    });
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('toDo', { required: 'Please Write a To Do' })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
