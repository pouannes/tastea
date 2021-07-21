import { Button } from '../core';
import UserSelect from '../UserSelect';
import { StickySideMenuProps } from './StickySideMenu';

interface MenuContentProps extends StickySideMenuProps {
  handleMenuClose: () => void;
}

export const MenuContent = ({
  users,
  loggedUser,
  setLoggedUser,
  setTeammelierOpen,
  setEditTea,
  handleMenuClose,
}: MenuContentProps): JSX.Element => {
  const handleTeammelierOpen = () => {
    setTeammelierOpen(true);
    handleMenuClose();
  };

  return (
    <>
      <Button color="accent" onClick={handleTeammelierOpen} className="mb-5">
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
