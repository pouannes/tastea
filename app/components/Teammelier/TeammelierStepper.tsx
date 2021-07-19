import { usePrevious } from 'rooks';
import TeammelierTransition from './TeammelierTransition';

import Question, { QuestionSubmitButton, QuestionTitle } from './Question';
import QuestionOptions from './Question/QuestionOptions';

type option = {
  label: string;
  value: number;
};

type step = {
  title: string;
  options: option[];
};
interface TeammelierStepperProps {
  currentStepIdx: number;
  steps: step[];
  handleNextStep: () => void;
}

const TeammelierStepper = ({
  currentStepIdx,
  steps,
  handleNextStep,
}: TeammelierStepperProps): JSX.Element => {
  const previousStep = usePrevious(currentStepIdx);

  return (
    <div className="relative">
      {steps.map((step, stepIdx) => (
        <TeammelierTransition
          key={step.title}
          show={currentStepIdx === stepIdx}
          reverse={
            typeof previousStep === 'number' && previousStep > currentStepIdx
          }
        >
          <Question>
            <QuestionTitle>{step.title}</QuestionTitle>
            <QuestionOptions options={step.options} />
            <QuestionSubmitButton handleNextStep={handleNextStep} />
          </Question>
        </TeammelierTransition>
      ))}
    </div>
  );
};

export default TeammelierStepper;
