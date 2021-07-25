import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { supabase } from '@/utils';
import AddTeaDrawer from '@/components/AddTeaDrawer';
import AddTeaPreferenceDrawer from '@/components/AddTeaPreferenceDrawer';
import { TagContextProvider, TeasContextProvider } from 'app/contexts';
import {
  tea,
  teaType,
  brand,
  fullTea,
  user,
  preference,
  tag,
} from '@/types/api';
import Teammelier from '@/components/Teammelier';
import { editTea } from '@/types/general';
import StickySideMenu from '@/components/StickySideMenu';
import TeaList from '@/components/TeaList';

interface HomeProps {
  teas: tea[];
  teaTypes: teaType[];
  teaBrands: brand[];
  users: user[];
  tags: tag[];
}

type editUserPreferenceClose = {
  open: false;
};

type editUserPreferenceOpen = {
  open: true;
  userPreference: preference | undefined;
  editTea: fullTea;
};

type editUserPreference = editUserPreferenceClose | editUserPreferenceOpen;

const Home = ({
  teas,
  teaTypes,
  teaBrands,
  users,
  tags,
}: HomeProps): JSX.Element => {
  // const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState<user | null>(null);

  const [editTea, setEditTea] = useState<editTea>({ open: false });
  const [userPreferences, setUserPreferences] = useState<preference[] | null>(
    null
  );
  const [editUserPreference, setEditUserPreference] =
    useState<editUserPreference>({ open: false });
  const [teammelierOpen, setTeammelierOpen] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data } = await supabase
        .from('preferences')
        .select(`id, tea_id, time_s, temperature, rating, user_id`)
        .eq('user_id', loggedUser?.id);
      setUserPreferences(data);
    };
    if (loggedUser) {
      fetchPreferences();
    } else {
      setUserPreferences(null);
    }
  }, [loggedUser]);

  const handleOpenEditDrawer = useCallback((tea) => {
    setEditTea({ open: true, mode: 'edit', editTea: tea });
  }, []);

  const handleOpenPreferenceDrawer = useCallback(
    (tea) => {
      setEditUserPreference({
        open: true,
        userPreference: userPreferences?.find(
          (preference) => preference.user_id === loggedUser?.id
        ),
        editTea: tea,
      });
    },
    [loggedUser?.id, userPreferences]
  );

  return (
    <TagContextProvider tags={tags}>
      <TeasContextProvider teas={teas}>
        <div className="h-screen scrollbar scrollbar-track-transparent scrollbar-thumb-bgPaper scrollbar-thumb-rounded-md scrollbar-thin bg-bgDefault hover:scrollbar-thumb-bgPaperSecondary">
          <div className="relative flex justify-center h-auto gap-12 pt-4 m-auto mx-4 md:pt-10 md:mx-10 ">
            <StickySideMenu
              users={users}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              setTeammelierOpen={setTeammelierOpen}
              setEditTea={setEditTea}
            />
            <Head>
              <title>Tastea</title>
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>

            <TeaList
              loggedUser={loggedUser}
              userPreferences={userPreferences}
              handleOpenEditDrawer={handleOpenEditDrawer}
              handleOpenPreferenceDrawer={handleOpenPreferenceDrawer}
              teaTypes={teaTypes}
              teaBrands={teaBrands}
            />
            <AddTeaDrawer
              open={editTea.open}
              handleClose={() => setEditTea({ open: false })}
              teaTypes={teaTypes}
              teaBrands={teaBrands}
              // setTeas={setTeas}
              mode={editTea.open ? editTea.mode : undefined}
              editTea={
                editTea.open && editTea.mode === 'edit'
                  ? editTea.editTea
                  : undefined
              }
            />
            <AddTeaPreferenceDrawer
              open={editUserPreference.open}
              loggedUser={loggedUser}
              handleClose={() => setEditUserPreference({ open: false })}
              setUserPreferences={setUserPreferences}
              userPreference={
                editUserPreference.open
                  ? userPreferences?.find(
                      (preference) =>
                        preference.tea_id === editUserPreference.editTea.id
                    )
                  : undefined
              }
              // mode={!!editTea ? (editTea === true ? 'add' : 'edit') : undefined}
              editTea={
                editUserPreference.open ? editUserPreference.editTea : undefined
              }
            />
            <Teammelier
              open={teammelierOpen}
              handleClose={() => setTeammelierOpen(false)}
            />
          </div>
        </div>
      </TeasContextProvider>
    </TagContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: teas } = await supabase
    .from('teas')
    .select(
      `*,
  brand:brand_id (id, name),
  type:tea_type_id (id, type)`
    )
    .order('name');

  const { data: tea_types } = await supabase
    .from('tea_types')
    .select('id, type');

  const { data: brands } = await supabase.from('brands').select('id, name');

  const { data: users } = await supabase
    .from('users')
    .select('id, first_name, last_name');

  const { data: tags } = await supabase.from('tags').select('id, name, type');

  return {
    props: {
      teas,
      teaTypes: tea_types,
      teaBrands: brands,
      users,
      tags,
    },
  };
};

export default Home;
