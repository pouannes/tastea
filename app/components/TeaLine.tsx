import { useState, useEffect } from 'react';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import {
  GlobeIcon,
  ClockIcon,
  TagIcon,
  CollectionIcon,
} from '@heroicons/react/outline';
import _ from 'lodash';

import { tea, preference } from '@/types/api';
import { formatTime, supabase } from '@/utils';
import {
  IconButton,
  ConfirmationDialog,
  Tag,
  TeaRating,
} from '@/components/core';
import TemperatureIcon from '@/public/temperature.svg';
import { useTagContext, useTeasContext } from 'app/contexts';

type mode = 'brand' | 'user';

interface TeaLineProps {
  tea: tea;
  handleOpenEditDrawer: (tea: tea) => void;
  mode: mode;
  userPreference: preference | undefined;
}

const TeaLine = ({
  tea,
  handleOpenEditDrawer,
  mode,
  userPreference,
}: TeaLineProps): JSX.Element => {
  const {
    id,
    name,
    brand_time_s,
    brand_temperature,
    brand,
    country,
    tag_ids,
    product_url,
    type: { type },
  } = tea;
  const tags = useTagContext();
  const { triggerFetchTeas } = useTeasContext();

  const [avgRating, setAvgRating] = useState<number | null>(null);

  const temperature =
    mode === 'brand' ? brand_temperature : userPreference?.temperature;
  const time = mode === 'brand' ? brand_time_s : userPreference?.time_s;
  const rating = mode === 'brand' ? avgRating : userPreference?.rating;

  const handleDeleteTea = async (tea: tea) => {
    const { error } = await supabase.from('teas').delete().eq('id', tea.id);
    if (!error) {
      triggerFetchTeas();
    }
  };

  useEffect(() => {
    const fetchAverageRatings = async () => {
      const { data } = await supabase
        .from('preferences')
        .select('rating')
        .eq('tea_id', id);

      if (data && data?.length > 0) {
        const average = data.reduce((acc, curr) => acc + curr.rating, 0);
        setAvgRating(parseFloat((average / data.length).toFixed(2)));
      }
    };
    if (mode === 'brand') {
      fetchAverageRatings();
    }
  }, [id, mode, avgRating]);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  return (
    <>
      <div className="grid w-full px-2 py-3 my-3 rounded-md grid-cols-teaLineLayout sm:grid-cols-teaLineLayoutSm lg:grid-cols-teaLineLayoutMd hover:bg-bgPaper">
        <div className="flex flex-col w-full mb-3">
          <div className="flex items-baseline justify-center w-full sm:justify-start">
            {product_url ? (
              <a
                className={`text-lg text-center text-accent hover:underline`}
                href={product_url}
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            ) : (
              <p className="text-lg text-center text-accent">{name}</p>
            )}
            <p className="ml-2 text-base text-center text-textSecondary">
              {brand.name}
            </p>
          </div>
          {!!country || !!type ? (
            <div className="flex items-baseline justify-center w-full mt-2 sm:justify-start">
              <p className="flex items-center justify-center w-full sm:justify-start text-textPrimary">
                {!!type ? (
                  <span className="flex items-center mr-5">
                    <CollectionIcon className="w-5 h-5 mr-2 text-textSecondary" />
                    {_.startCase(type)}
                  </span>
                ) : null}
                {!!country ? (
                  <span className="flex items-center mr-5">
                    <GlobeIcon className="w-5 h-5 mr-2 text-textSecondary" />
                    {country}
                  </span>
                ) : null}
              </p>
            </div>
          ) : null}

          {tag_ids?.length > 0 ? (
            <div className="flex justify-start mt-3 mr-5 text-sm sm:justify-start text-textPrimary">
              <TagIcon className="w-5 h-5 max-w-[1.25rem] min-w-[1.2rem] max-h-5 text-textSecondary my-2" />
              <div className="flex flex-wrap ml-2 item-center">
                {tag_ids.map((tagId) => {
                  const tag = tags.find((tag) => tag.id === tagId);
                  return tag ? (
                    <Tag key={tagId} className="m-1">
                      {tag.name}
                    </Tag>
                  ) : null;
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2">
          <div className="flex items-center justify-center m-auto">
            {rating ? (
              <TeaRating value={rating} size="sm" readOnly />
            ) : (
              <p className={'text-textSecondary italic w-[140px]'}>No Rating</p>
            )}
          </div>

          <div className="flex items-center justify-around flex-grow">
            <div className="flex items-center justify-center ">
              <ClockIcon className="w-5 h-5 mr-1 text-textSecondary" />
              {
                <p className="text-textPrimary">
                  {time ? formatTime(time) : '-'}
                </p>
              }
            </div>

            <div className="flex items-center justify-center ">
              <TemperatureIcon className="w-5 h-5 mr-1 fill-current text-textSecondary" />
              <p className="text-textPrimary">
                {temperature ? `${temperature}°` : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full sm:justify-end">
          <IconButton
            srName="Edit tea"
            onClick={() => handleOpenEditDrawer(tea)}
          >
            <PencilAltIcon />
          </IconButton>
          <IconButton
            srName="Delete tea"
            onClick={() => setConfirmationDialogOpen(true)}
            className="ml-3"
          >
            <TrashIcon />
          </IconButton>
        </div>
        <ConfirmationDialog
          open={confirmationDialogOpen}
          setOpen={setConfirmationDialogOpen}
          onConfirm={() => handleDeleteTea(tea)}
          title={`Delete tea`}
          legend={`Are you sure you want to delete tea "${name}"? All of the related data will be permanently removed. This action cannot be undone.`}
        />
      </div>
      <span className="w-full px-2 h-[1px] bg-bgPaper" />
    </>
  );
};

export default TeaLine;
