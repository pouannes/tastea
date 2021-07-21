import { Button } from '../core';
import UserSelect from '../UserSelect';
import { user } from '@/types/api';
import { editTea } from '@/types/general';

export interface MenuContentProps {
  users: user[];
  loggedUser: user | null;
  setLoggedUser: (user: user | null) => void;
  setTeammelierOpen: (value: boolean) => void;
  setEditTea: (value: editTea) => void;
}

export const MenuContent = ({
  users,
  loggedUser,
  setLoggedUser,
  setTeammelierOpen,
  setEditTea,
}: MenuContentProps): JSX.Element => {
  return (
    <>
      <Button
        color="accent"
        onClick={() => setTeammelierOpen(true)}
        className="mb-5"
      >
        Open Teammelier
      </Button>

      <UserSelect
        users={users}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <Button
        className="mt-5"
        color="accent"
        onClick={() => setEditTea({ open: true, mode: 'add' })}
      >
        Add tea
      </Button>
    </>
  );
};

export default MenuContent;
