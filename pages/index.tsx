import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { supabase } from '../utils/supabaseClient';
import TemperatureIcon from '../public/temperature.svg';
import TeaIcon from '../public/tea.svg';

interface brand {
  name: string;
}

interface tea {
  name: string;
  brand_time_s: number;
  brand_temperature: string;
  brand: brand;
}

const formatTime = (time: number): string => {
  if (time < 60) return `${time}s`;
  if (time % 60 === 0) return `${time / 60}min`;
  if (time % 60 < 30) return `${Math.floor(time / 60)}min`;
  return `${Math.floor(time / 60)}min30`;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [teas, setTeas] = useState<tea[] | null>(null);

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        let { data, error, status } = await supabase.from('teas').select(`name, 
                   brand_time_s, 
                   brand_temperature,
                   brand:brand_id (name)`);

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
          <TemperatureIcon className="w-8 h-8 fill-current text-textPrimary" />
          <TeaIcon className="w-8 h-8 fill-current text-textPrimary" />
        </div>
        {teas ? teas.map((tea) => <TeaLine key={tea.name} {...tea} />) : null}
      </div>
    </div>
  );
}

const TeaLine: React.FC<tea> = ({
  name,
  brand_time_s,
  brand_temperature,
  brand,
}) => {
  return (
    <div className="grid w-full grid-cols-4 py-2 border-t">
      <p className="text-textPrimary">{name}</p>
      <p className="text-textPrimary">{brand.name}</p>
      <p className="text-textPrimary">{formatTime(brand_time_s)}</p>
      <p className="text-textPrimary">{brand_temperature}</p>
    </div>
  );
};
