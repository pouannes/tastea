import { PencilAltIcon } from '@heroicons/react/solid';

import { tea } from '@/types/api';
import { formatTime } from '@/utils';

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
      <PencilAltIcon
        className="p-1 rounded-md cursor-pointer w-7 h-7 text-textSecondary hover:text-textPrimary hover:bg-bgPaperSecondary"
        onClick={() => handleOpenEditDrawer(tea)}
      />
    </div>
  );
};

export default TeaLine;
