import { Fragment, useState } from 'react';

import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/solid';

import MenuContent, { MenuContentProps } from './MenuContent';
import { Transition } from '@headlessui/react';

type StickySideMenuProps = MenuContentProps;

export const StickySideMenu = (props: StickySideMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* in md + screens */}
      <div className="hidden h-auto md:block">
        <div className="sticky left-0 flex flex-col p-5 rounded-lg mt-7 top-10 w-60 bg-bgPaper">
          <MenuContent {...props} />
        </div>
      </div>

      {/* In md - screens */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="opacity-100 translate-y-0 "
        leaveTo="opacity-0 translate-y-full "
      >
        <div className="fixed bottom-0 flex flex-col items-center p-5 pt-0 -translate-x-1/2 border-2 border-b-0 rounded-t-lg left-1/2 md:hidden bg-bgPaper border-accent">
          <div
            className="flex w-full h-6 m-2 rounded align-items text-textSecondary hover:bg-bgPaperSecondary"
            onClick={() => setIsOpen(false)}
          >
            <ChevronDownIcon />
          </div>
          <MenuContent {...props} />
        </div>
      </Transition>

      <button
        className="fixed flex items-center justify-center rounded-full w-14 h-14 focus:outline-none bottom-8 right-4 sm:right-8 bg-accentVeryDark text-accent md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Toggle menu open</span>
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default StickySideMenu;
