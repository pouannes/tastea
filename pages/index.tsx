import { useState, useEffect } from 'react';
import Head from 'next/head';

import { supabase } from '@/utils';
import TemperatureIcon from '@/public/temperature.svg';
import TeaIcon from '@/public/tea.svg';
import TeaLine from '@/components/TeaLine';
import { Drawer } from '@/components/core';
import { tea } from '@/types/api';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [teas, setTeas] = useState<tea[] | null>(null);
  const [editTea, setEditTea] = useState(false);

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        let { data, error, status } = await supabase.from('teas').select(`name, 
                   brand_time_s, 
                   brand_temperature,
                   brand:brand_id (name),
                   type:tea_type_id (type)`);

        console.log(data);
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
        <div className="grid w-full grid-cols-4 mb-2">
          <p className="text-textPrimary">Tea</p>
          <p className="text-textPrimary">Brand</p>
          <TeaIcon className="w-8 h-8 fill-current text-textPrimary" />
          <TemperatureIcon className="w-8 h-8 fill-current text-textPrimary" />
        </div>
        {teas ? teas.map((tea) => <TeaLine key={tea.name} {...tea} />) : null}
        <button
          className="px-5 py-2 rounded-md text-textPrimary bg-bgPaper "
          onClick={() => setEditTea((prev) => !prev)}
        >
          Add tea
        </button>
      </div>

      <Drawer open={editTea} setOpen={setEditTea} />
    </div>
  );
}
