import { forwardRef } from 'react';

interface QuestionProps {
  children: JSX.Element | JSX.Element[];
}

const Question = forwardRef<HTMLDivElement, QuestionProps>(
  ({ children }, ref) => {
    return <div ref={ref}>{children}</div>;
  }
);

Question.displayName = 'Question';

export default Question;
