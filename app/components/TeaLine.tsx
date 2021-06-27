import { tea } from '@/types/api';
import { formatTime } from '@/utils';

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

export default TeaLine;
