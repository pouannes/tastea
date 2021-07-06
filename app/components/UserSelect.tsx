import { user } from '@/types/api';
import { Button } from '@/components/core/Button';

interface UserSelectProps {
  users: user[];
  loggedUser: user | null;
  setLoggedUser: (user: user | null) => void;
}

const UserSelect = ({
  users,
  loggedUser,
  setLoggedUser,
}: UserSelectProps): JSX.Element => {
  return (
    <div className="flex items-center">
      <p className="mr-4 text-textSecondary">Selected user:</p>
      {users?.map((user) => (
        <Button
          key={user.id}
          className="mr-2 transition duration-300 ease-in-out"
          variant={loggedUser?.id === user.id ? 'accent' : undefined}
          onClick={() =>
            loggedUser?.id === user.id
              ? setLoggedUser(null)
              : setLoggedUser(user)
          }
        >
          {user.first_name}
        </Button>
      ))}
    </div>
  );
};

export default UserSelect;
