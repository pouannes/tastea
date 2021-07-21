import { useState } from 'react';

import { MenuIcon, XIcon } from '@heroicons/react/solid';

import MenuContent, { MenuContentProps } from './MenuContent';

type StickySideMenuProps = MenuContentProps;

export const StickySideMenu = (props: StickySideMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* in lg + screens */}
      <div className="hidden h-auto lg:block">
        <MenuContent {...props} />
      </div>

      {/* In lg - screens */}
      <button
        className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full focus:outline-none bottom-8 right-8 bg-accentVeryDark text-accent lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Toggle menu open</span>
        {isOpen ? (
          <XIcon className="w-8 h-8" />
        ) : (
          <MenuIcon className="w-8 h-8" />
        )}
      </button>
    </>
  );
};

export default StickySideMenu;
