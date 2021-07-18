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
  return (
    <div className="flex flex-wrap justify-start alignItems">
      {options.map((option) => (
        <Option
          label={option.label}
          key={String(option.value)}
          onClick={() => console.log(option.value)}
        />
      ))}
    </div>
  );
};

export default QuestionOptions;
