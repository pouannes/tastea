import { PencilAltIcon } from '@heroicons/react/solid';

import { tea } from '@/types/api';
import { formatTime } from '@/utils';
import { IconButton } from '@/components/core';

interface TeaLineProps {
  tea: tea;
  handleOpenEditDrawer: (tea: tea) => void;
}

const TeaLine = ({ tea, handleOpenEditDrawer }: TeaLineProps): JSX.Element => {
  const { name, brand_time_s, brand_temperature, brand } = tea;
  return (
    <div className="grid w-full grid-cols-5 py-2 border-t">
      <p className="text-textPrimary">{name}</p>
      <p className="text-textPrimary">{brand.name}</p>
      <p className="text-textPrimary">{formatTime(brand_time_s)}</p>
      <p className="text-textPrimary">{brand_temperature}</p>
      <IconButton srName="Edit tea" onClick={() => handleOpenEditDrawer(tea)}>
        <PencilAltIcon />
      </IconButton>
    </div>
  );
};

export default TeaLine;
