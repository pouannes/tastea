import { usePrevious } from 'rooks';
import TeammelierTransition from './TeammelierTransition';

import Question, { QuestionTitle } from './Question';
import QuestionOptions from './Question/QuestionOptions';

interface TeammelierStepperProps {
  currentStepIdx: number;
  steps: string[];
}

const mockOptions = [
  {
    label: 'Andrea Bocelli',
    value: 1,
  },
  {
    label: 'Salvador Dali',
    value: 2,
  },
  {
    label: 'René Magritte',
    value: 3,
  },
  {
    label: 'Grant Wood',
    value: 4,
  },
  {
    label: 'Frida Kahlo',
    value: 5,
  },
];

const TeammelierStepper = ({
  currentStepIdx,
  steps,
}: TeammelierStepperProps): JSX.Element => {
  const previousStep = usePrevious(currentStepIdx);

  return (
    <div>
      <Question>
        <QuestionTitle>What is this first question, I wonder?</QuestionTitle>
        <QuestionOptions options={mockOptions} />
      </Question>
      {/* {steps.map((step, stepIdx) => (
        <TeammelierTransition
          key={step}
          show={currentStepIdx === stepIdx}
          reverse={
            typeof previousStep === 'number' && previousStep > currentStepIdx
          }
        >
          <p>{step}</p>
        </TeammelierTransition>
      ))} */}
    </div>
  );
};

export default TeammelierStepper;
