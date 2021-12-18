import { useRecoilState } from 'recoil';
import { hourSelector, minuteState } from 'atoms';

import type { FC, FormEvent } from 'react';

const App: FC = () => {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const handleMinutesChange = (event: FormEvent<HTMLInputElement>) => {
    setMinutes(Number(event.currentTarget.value));
  };

  const handleHoursChange = (event: FormEvent<HTMLInputElement>) => {
    setHours(Number(event.currentTarget.value));
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={handleMinutesChange}
        type="number"
        placeholder="minute"
      />
      <input
        value={hours}
        onChange={handleHoursChange}
        type="number"
        placeholder="hours"
      />
    </div>
  );
};

export default App;
