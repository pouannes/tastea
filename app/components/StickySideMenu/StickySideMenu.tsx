import { useState } from 'react';

import { MenuIcon, XIcon } from '@heroicons/react/solid';

import { Button } from '../core';
import UserSelect from '../UserSelect';
import { user } from '@/types/api';
import { editTea } from '@/types/general';

interface StickySideMenuProps {
  users: user[];
  loggedUser: user | null;
  setLoggedUser: (user: user | null) => void;
  setTeammelierOpen: (value: boolean) => void;
  setEditTea: (value: editTea) => void;
}

export const StickySideMenu = ({
  users,
  loggedUser,
  setLoggedUser,
  setTeammelierOpen,
  setEditTea,
}: StickySideMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* in lg+ screens */}
      <div className="hidden h-auto lg:block">
        <div className="sticky left-0 flex flex-col p-5 rounded-lg mt-7 top-10 w-60 bg-bgPaper">
          <Button
            color="accent"
            onClick={() => setTeammelierOpen(true)}
            className="self-start mb-5"
          >
            Open Teammelier
          </Button>

          <UserSelect
            users={users}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
          />
          <Button
            className="self-start mt-5"
            color="accent"
            onClick={() => setEditTea({ open: true, mode: 'add' })}
          >
            Add tea
          </Button>
        </div>
      </div>

      {/* In lg- screens */}
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
