import { useState } from 'react';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import {
  GlobeIcon,
  ClockIcon,
  SparklesIcon,
  TagIcon,
} from '@heroicons/react/outline';

import { tea, preference } from '@/types/api';
import { formatTime } from '@/utils';
import { IconButton, ConfirmationDialog, Tag } from '@/components/core';
import TemperatureIcon from '@/public/temperature.svg';

type mode = 'brand' | 'user';

interface TeaLineProps {
  tea: tea;
  handleOpenEditDrawer: (tea: tea) => void;
  handleDeleteTea: (tea: tea) => void;
  mode: mode;
  userPreference: preference | undefined;
}

const TeaLine = ({
  tea,
  handleOpenEditDrawer,
  handleDeleteTea,
  mode,
  userPreference,
}: TeaLineProps): JSX.Element => {
  console.log(userPreference);
  const {
    name,
    brand_time_s,
    brand_temperature,
    brand,
    drinking_conditions,
    country,
    flavor,
  } = tea;

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  return (
    <>
      <div className="grid w-full px-2 py-3 my-3 rounded-md grid-cols-teaLineLayout sm:grid-cols-teaLineLayoutMd hover:bg-bgPaper">
        <div className="flex flex-col w-full mb-3">
          <div className="flex items-baseline justify-center w-full sm:justify-start">
            <p className="text-lg text-center text-accent">{name}</p>
            <p className="ml-2 text-base text-center text-textSecondary">
              {brand.name}
            </p>
          </div>
          {!!country || !!flavor ? (
            <div className="flex items-baseline justify-center w-full mt-2 sm:justify-start">
              <p className="flex items-center justify-center w-full sm:justify-start text-textPrimary">
                {!!country ? (
                  <span className="flex items-center mr-5">
                    <GlobeIcon className="w-5 h-5 mr-2 text-textSecondary" />
                    {country}
                  </span>
                ) : null}
                {!!flavor ? (
                  <span className="flex items-center mr-5">
                    <SparklesIcon className="w-5 h-5 mr-2 text-textSecondary" />
                    {flavor}
                  </span>
                ) : null}
              </p>
            </div>
          ) : null}

          {drinking_conditions ? (
            <span className="flex items-center justify-center mt-3 mr-5 text-sm sm:justify-start text-textPrimary">
              <TagIcon className="w-5 h-5 mr-2 text-textSecondary" />
              <Tag>{drinking_conditions}</Tag>
            </span>
          ) : null}
        </div>
        {mode === 'brand' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center w-full h-full">
              <ClockIcon className="w-5 h-5 mr-1 text-textSecondary" />
              <p className="text-textPrimary"> {formatTime(brand_time_s)}</p>
            </div>

            <div className="flex items-center justify-center w-full h-full">
              <TemperatureIcon className="w-5 h-5 mr-1 fill-current text-textSecondary" />
              <p className="text-textPrimary">{brand_temperature}°</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center w-full h-full">
              <p
                className={
                  userPreference?.rating
                    ? 'text-textPrimary'
                    : 'text-textSecondary italic'
                }
              >
                {userPreference?.rating ? userPreference.rating : 'No Rating'}
              </p>
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <ClockIcon className="w-5 h-5 mr-1 text-textSecondary" />
              {
                <p className="text-textPrimary">
                  {userPreference?.time_s
                    ? formatTime(userPreference.time_s)
                    : '-'}
                </p>
              }
            </div>

            <div className="flex items-center justify-center w-full h-full">
              <TemperatureIcon className="w-5 h-5 mr-1 fill-current text-textSecondary" />
              <p className="text-textPrimary">
                {userPreference?.temperature
                  ? `${formatTime(userPreference.temperature)}°`
                  : '-'}
              </p>
            </div>
          </div>
        )}

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
