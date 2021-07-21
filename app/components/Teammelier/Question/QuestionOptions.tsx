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
    <div className="grid justify-start grid-cols-1 gap-4 mt-8 w-72 sm:w-[550px] md:w-[600px] sm:grid-cols-2 align-item">
      {options.map((option, optionIdx) => (
        <Option
          label={option.label}
          key={String(option.value)}
          handleClick={() => toggleOption(option.value)}
          selected={selectedOptions.includes(option.value)}
          index={optionIdx}
        />
      ))}
    </div>
  );
};

export default QuestionOptions;
