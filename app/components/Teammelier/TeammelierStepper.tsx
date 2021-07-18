import { usePrevious } from 'rooks';
import TeammelierTransition from './TeammelierTransition';

import Question, { QuestionTitle } from './Question';
import QuestionOptions from './Question/QuestionOptions';

type option = {
  label: string;
  value: string | number;
};

type step = {
  title: string;
  options: option[];
};
interface TeammelierStepperProps {
  currentStepIdx: number;
  steps: step[];
}

const TeammelierStepper = ({
  currentStepIdx,
  steps,
}: TeammelierStepperProps): JSX.Element => {
  const previousStep = usePrevious(currentStepIdx);

  return (
    <div>
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
          </Question>
        </TeammelierTransition>
      ))}
    </div>
  );
};

export default TeammelierStepper;
