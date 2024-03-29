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
  const startState = 'translate-y-[70vh] opacity-0';
  const normalState = '-translate-y-1/2 opacity-100';
  const leaveState = 'translate-y-[-70vh] opacity-0';

  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transform transition ease-in duration-500 sm:duration-400"
      enterFrom={reverse ? leaveState : startState}
      enterTo={normalState}
      entered="-translate-y-1/2"
      leave="transform transition ease-in duration-500 sm:duration-400"
      leaveFrom={normalState}
      leaveTo={reverse ? startState : leaveState}
    >
      {children}
    </Transition>
  );
};

export default TeammelierTransition;
