import { forwardRef } from 'react';

interface QuestionProps {
  children: JSX.Element | JSX.Element[];
}

const Question = forwardRef<HTMLDivElement, QuestionProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[700px] absolute right-0 left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    );
  }
);

Question.displayName = 'Question';

export default Question;
