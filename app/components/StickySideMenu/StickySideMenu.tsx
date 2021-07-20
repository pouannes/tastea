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
    <div className="fixed flex flex-col p-5 rounded-lg left-8 top-[52px] w-60 bg-bgPaper">
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
  );
};

export default StickySideMenu;
