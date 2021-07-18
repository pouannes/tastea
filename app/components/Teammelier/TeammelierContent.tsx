import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { IconButton } from '../core';
import TeammelierStepper from './TeammelierStepper';
import { useKey } from 'rooks';

const steps = [
  'content 0',
  'content 1',
  'content 2',
  'content 3',
  'content 4',
  'content 5',
];

const TeammelierContent = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const handlePreviousStep = () => setStep((prev) => Math.max(0, prev - 1));
  const handleNextStep = () =>
    setStep((prev) => Math.min(steps.length - 1, prev + 1));

  useKey(['ArrowUp'], handlePreviousStep);
  useKey(['ArrowDown'], handleNextStep);

  return (
    <div className="relative inset-0 flex items-center justify-center w-full h-full">
      <TeammelierStepper currentStepIdx={step} steps={steps} />

      <div className="absolute flex items-center bottom-5 right-5">
        <IconButton onClick={handlePreviousStep} className="w-10 h-10">
          <ChevronUpIcon />
        </IconButton>
        <IconButton onClick={handleNextStep} className="w-10 h-10">
          <ChevronDownIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TeammelierContent;
