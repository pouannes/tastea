import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/utils';
import TeaLine from '@/components/TeaLine';
import AddTeaDrawer from '@/components/AddTeaDrawer';
import UserSelect from '@/components/UserSelect';
import { Button } from '@/components/core';
import { tea, teaType, brand, fullTea, user } from '@/types/api';

interface HomeProps {
  teaTypes: teaType[];
  teaBrands: brand[];
  users: user[];
}

const Home = ({ teaTypes, teaBrands, users }: HomeProps): JSX.Element => {
  // const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState<user | null>(null);

  const [teas, setTeas] = useState<tea[] | null>([]);
  const [editTea, setEditTea] = useState<fullTea | boolean>(false);

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const { data } = await supabase.from('teas').select(`*,
                   brand:brand_id (id, name),
                   type:tea_type_id (id, type)`);

        setTeas(data);
      } catch (error) {}
    };

    fetchTeas();
  }, []);

  const handleDeleteTea = async (tea: tea) => {
    const { error } = await supabase.from('teas').delete().eq('id', tea.id);
    if (!error) {
      setTeas((prevTeas) =>
        prevTeas ? prevTeas?.filter((item) => item.id !== tea.id) : []
      );
    }
  };

  const handleOpenEditDrawer = useCallback((tea) => {
    setEditTea(tea);
  }, []);

  return (
    <div className="pt-10 overflow-auto bg-bgDefault">
      <Head>
        <title>Tastea</title> ===
      </Head>
      <div className="flex flex-col items-center justify-center w-5/6 h-auto m-auto ">
        <div className="flex items-center justify-between w-full mb-6">
          <UserSelect
            users={users}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
          />
          <Button
            className="self-end"
            variant="accent"
            onClick={() => setEditTea((prev) => !prev)}
          >
            Add tea
          </Button>
        </div>
        {teas
          ? teas.map((tea) => (
              <TeaLine
                key={uuidv4()}
                tea={tea}
                handleOpenEditDrawer={handleOpenEditDrawer}
                handleDeleteTea={handleDeleteTea}
              />
            ))
          : null}
      </div>
      <AddTeaDrawer
        open={!!editTea}
        setOpen={setEditTea}
        teaTypes={teaTypes}
        teaBrands={teaBrands}
        setTeas={setTeas}
        mode={!!editTea ? (editTea === true ? 'add' : 'edit') : undefined}
        editTea={typeof editTea === 'boolean' ? undefined : editTea}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: tea_types } = await supabase
    .from('tea_types')
    .select('id, type');

  const { data: brands } = await supabase.from('brands').select('id, name');

  const { data: users } = await supabase
    .from('users')
    .select('id, first_name, last_name');

  return {
    props: {
      teaTypes: tea_types,
      teaBrands: brands,
      users,
    },
  };
};

export default Home;
