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
    <div className="flex flex-col items-start">
      <p className="mr-4 text-textSecondary">Selected user:</p>
      <div className="flex flex-col items-center justify-between gap-3 mt-2">
        {users?.map((user) => (
          <Button
            key={user.id}
            variant={loggedUser?.id === user.id ? 'contained' : 'outlined'}
            className="w-32 px-4 transition duration-300 ease-in-out"
            color={'accent'}
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
    </div>
  );
};

export default UserSelect;
