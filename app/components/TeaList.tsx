import { useTeasContext } from '@/contexts';
import { preference, tea, user, teaType, brand } from '@/types/api';
import TeaLine from './TeaLine';
import TeaSearch from './TeaSearch';

type TeaListProps = {
  loggedUser: user | null;
  userPreferences: preference[] | null;
  handleOpenEditDrawer: (tea: tea) => void;
  handleOpenPreferenceDrawer: (tea: tea) => void;
  teaTypes: teaType[];
  teaBrands: brand[];
};

const TeaList = ({
  loggedUser,
  userPreferences,
  handleOpenEditDrawer,
  handleOpenPreferenceDrawer,
  teaTypes,
  teaBrands,
}: TeaListProps): JSX.Element => {
  const { searchTeas } = useTeasContext();
  return (
    <div className="flex flex-col w-full max-w-3xl ">
      <TeaSearch teaTypes={teaTypes} teaBrands={teaBrands} />
      {searchTeas && searchTeas.length > 0 ? (
        searchTeas.map((tea) => (
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
      ) : (
        <div className="flex items-center justify-center w-full h-40">
          <p className="text-2xl text-textSecondary">No results</p>
        </div>
      )}
    </div>
  );
};

export default TeaList;
