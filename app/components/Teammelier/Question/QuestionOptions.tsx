import { useTeammelierContext } from '../teammelier-context';
import Option from './Option';

type option = {
  label: string;
  value: number;
};

interface QuestionOptionsProps {
  options: option[];
}

const QuestionOptions = ({ options }: QuestionOptionsProps): JSX.Element => {
  const { selectedOptions, toggleOption } = useTeammelierContext();

  return (
    <div className="grid justify-start w-full grid-cols-2 gap-4 mt-8 align-item">
      {options.map((option, optionIdx) => (
        <Option
          label={option.label}
          key={String(option.value)}
          onClick={() => toggleOption(option.value)}
          selected={selectedOptions.includes(option.value)}
          index={optionIdx}
        />
      ))}
    </div>
  );
};

export default QuestionOptions;
