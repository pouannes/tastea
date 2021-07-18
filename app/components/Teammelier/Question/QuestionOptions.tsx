import { useState } from 'react';

import Option from './Option';

type option<T> = {
  label: string;
  value: T;
};

interface QuestionOptionsProps<T> {
  options: option<T>[];
}

const QuestionOptions = <T,>({
  options,
}: QuestionOptionsProps<T>): JSX.Element => {
  const [selected, setSelected] = useState<T | null>(null);

  return (
    <div className="grid justify-start w-full grid-cols-2 gap-4 mt-8 align-item">
      {options.map((option) => (
        <Option
          label={option.label}
          key={String(option.value)}
          onClick={() => setSelected(option.value)}
          selected={selected === option.value}
        />
      ))}
    </div>
  );
};

export default QuestionOptions;
