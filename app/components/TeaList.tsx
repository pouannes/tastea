import { useTeasContext } from '@/contexts';
import { preference, tea, user } from '@/types/api';
import TeaLine from './TeaLine';

type TeaListProps = {
  loggedUser: user | null;
  userPreferences: preference[] | null;
  handleOpenEditDrawer: (tea: tea) => void;
  handleOpenPreferenceDrawer: (tea: tea) => void;
};

const TeaList = ({
  loggedUser,
  userPreferences,
  handleOpenEditDrawer,
  handleOpenPreferenceDrawer,
}: TeaListProps): JSX.Element => {
  const { teas } = useTeasContext();
  return (
    <div className="flex flex-col w-full max-w-3xl ">
      {teas
        ? teas.map((tea) => (
            <TeaLine
              key={tea.id}
              tea={tea}
              handleOpenEditDrawer={
                !loggedUser || userPreferences === null
                  ? handleOpenEditDrawer
                  : handleOpenPreferenceDrawer
              }
              mode={!!loggedUser ? 'user' : 'brand'}
              userPreference={
                userPreferences
                  ? userPreferences.find(
                      (preference) => preference.tea_id === tea.id
                    )
                  : undefined
              }
            />
          ))
        : null}
    </div>
  );
};

export default TeaList;
