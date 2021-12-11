import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from 'atoms';

import type { FC } from 'react';

type FormType = {
  toDo: string;
};

const CreateToDo: FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormType>();
  const setToDos = useSetRecoilState(toDoState);

  const onSubmit = ({ toDo }: FormType) => {
    setToDos(oldToDos => [
      ...oldToDos,
      { id: Date.now(), text: toDo, category: 'TO_DO' },
    ]);
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
