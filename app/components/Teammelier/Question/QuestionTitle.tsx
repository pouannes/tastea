interface QuestionTitleProps {
  children: string;
}

const QuestionTitle = ({ children }: QuestionTitleProps): JSX.Element => {
  return <p className="w-auto text-2xl">{children}</p>;
};

export default QuestionTitle;
