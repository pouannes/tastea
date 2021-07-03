import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/utils';
import TemperatureIcon from '@/public/temperature.svg';
import TeaIcon from '@/public/tea.svg';
import TeaLine from '@/components/TeaLine';
import AddTeaDrawer from '@/components/AddTeaDrawer';
import { Button } from '@/components/core';
import { tea, teaType, brand, fullTea } from '@/types/api';

interface HomeProps {
  teaTypes: teaType[];
  teaBrands: brand[];
}

const Home = ({ teaTypes, teaBrands }: HomeProps): JSX.Element => {
  // const [loading, setLoading] = useState(true);
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
    <div className="h-screen bg-bgDefault">
      <Head>
        <title>Tastea</title> ===
      </Head>
      <div className="flex flex-col items-center justify-center w-5/6 h-full m-auto">
        <Button
          className="self-end mb-6"
          variant="accent"
          onClick={() => setEditTea((prev) => !prev)}
        >
          Add tea
        </Button>
        <div className="grid w-full grid-cols-5 mb-2">
          <p className="text-textPrimary">Tea</p>
          <p className="text-textPrimary">Brand</p>
          <TeaIcon className="w-8 h-8 fill-current text-textPrimary" />
          <TemperatureIcon className="w-8 h-8 fill-current text-textPrimary" />
          <p className="text-textPrimary">Actions</p>
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

export const getStaticProps: GetStaticProps = async () => {
  const { data: tea_types } = await supabase
    .from('tea_types')
    .select('id, type');

  const { data: brands } = await supabase.from('brands').select('id, name');

  return {
    props: {
      teaTypes: tea_types,
      teaBrands: brands,
    },
  };
};

export default Home;
