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
  return (
    <div className="w-full">
      <Button
        color="accent"
        onClick={() => setTeammelierOpen(true)}
        className="self-start mb-5"
      >
        Open Teammelier
      </Button>
      <div className="flex flex-wrap items-center justify-between w-full gap-2 mb-6">
        <UserSelect
          users={users}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
        <Button
          className="self-end"
          color="accent"
          onClick={() => setEditTea({ open: true, mode: 'add' })}
        >
          Add tea
        </Button>
      </div>
    </div>
  );
};

export default StickySideMenu;
