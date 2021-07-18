import { usePrevious } from 'rooks';
import TeammelierTransition from './TeammelierTransition';

interface TeammelierStepperProps {
  currentStepIdx: number;
  steps: string[];
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
          key={step}
          show={currentStepIdx === stepIdx}
          reverse={
            typeof previousStep === 'number' && previousStep > currentStepIdx
          }
        >
          <p>{step}</p>
        </TeammelierTransition>
      ))}
    </div>
  );
};

export default TeammelierStepper;
