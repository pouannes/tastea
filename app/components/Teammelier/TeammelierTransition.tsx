import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

interface TeammelierTransitionProps {
  show: boolean;
  reverse?: boolean;
  children: JSX.Element | JSX.Element[];
}

const TeammelierTransition = ({
  show,
  reverse,
  children,
}: TeammelierTransitionProps): JSX.Element => {
  const startState = 'translate-y-[60vh] opacity-0';
  const normalStateStart = 'translate-y-[-50%] opacity-100';

  const normalStateLeave = 'translate-y-[50%] opacity-100';
  const leaveState = 'translate-y-[-60vh] opacity-0';

  return (
    <Transition
      as={Fragment}
      show={show}
      enter={`transform transition ease-out duration-1000 sm:duration-400 ${
        reverse ? leaveState : startState
      }`}
      enterFrom={reverse ? leaveState : startState}
      enterTo={reverse ? normalStateLeave : normalStateStart}
      entered={'translate-y-0'}
      leave={`transform transition ease-out duration-1000 sm:duration-400 ${
        reverse ? startState : leaveState
      }`}
      leaveFrom={reverse ? normalStateStart : normalStateLeave}
      leaveTo={reverse ? startState : leaveState}
    >
      {children}
    </Transition>
  );
};

export default TeammelierTransition;
