import { Button } from '@/components/core';

type QuestionSubmitButtonProps = {
  handleNextStep: () => void;
};

const QuestionSubmitButton = ({
  handleNextStep,
}: QuestionSubmitButtonProps): JSX.Element => {
  return (
    <div className="flex items-center justify-start mt-8">
      <Button
        onClick={handleNextStep}
        color="accent"
        className="px-3 mr-3 text-sm focus:ring-offset-bgPaper"
        tabIndex={0}
      >
        OK
      </Button>
      <p className="text-xs text-textSecondary">
        press <span className="font-bold">Enter</span> ↵
      </p>
    </div>
  );
};

export default QuestionSubmitButton;
