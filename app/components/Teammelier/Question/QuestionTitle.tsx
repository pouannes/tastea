interface QuestionTitleProps {
  children: string;
}

const QuestionTitle = ({ children }: QuestionTitleProps): JSX.Element => {
  return (
    <div>
      <p className="text-2xl">{children}</p>
    </div>
  );
};

export default QuestionTitle;
