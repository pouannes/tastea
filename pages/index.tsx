import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import { supabase } from '@/utils';
import TemperatureIcon from '@/public/temperature.svg';
import TeaIcon from '@/public/tea.svg';
import TeaLine from '@/components/TeaLine';
import AddTeaDrawer from '@/components/AddTeaDrawer';
import { Button } from '@/components/core';
import { tea, teaType } from '@/types/api';

interface HomeProps {
  teaTypes: teaType[];
}

const Home = ({ teaTypes }: HomeProps): JSX.Element => {
  // const [loading, setLoading] = useState(true);
  const [teas, setTeas] = useState<tea[] | null>(null);
  const [editTea, setEditTea] = useState(false);
  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const { data } = await supabase.from('teas').select(`name, 
                   brand_time_s, 
                   brand_temperature,
                   brand:brand_id (name),
                   type:tea_type_id (type)`);

        // console.log(data);
        setTeas(data);
      } catch (error) {}
    };

    fetchTeas();
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
        <div className="grid w-full grid-cols-4 mb-2">
          <p className="text-textPrimary">Tea</p>
          <p className="text-textPrimary">Brand</p>
          <TeaIcon className="w-8 h-8 fill-current text-textPrimary" />
          <TemperatureIcon className="w-8 h-8 fill-current text-textPrimary" />
        </div>
        {teas ? teas.map((tea) => <TeaLine key={tea.name} {...tea} />) : null}
      </div>

      <AddTeaDrawer open={editTea} setOpen={setEditTea} teaTypes={teaTypes} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: tea_types } = await supabase
    .from('tea_types')
    .select('id, type');
  return {
    props: {
      teaTypes: tea_types,
    },
  };
};

export default Home;
