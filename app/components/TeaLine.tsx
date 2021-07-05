import { useState } from 'react';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

import { tea } from '@/types/api';
import { formatTime } from '@/utils';
import { IconButton, ConfirmationDialog } from '@/components/core';
import TemperatureIcon from '@/public/temperature.svg';
import TeaIcon from '@/public/tea.svg';

interface TeaLineProps {
  tea: tea;
  handleOpenEditDrawer: (tea: tea) => void;
  handleDeleteTea: (tea: tea) => void;
}

const TeaLine = ({
  tea,
  handleOpenEditDrawer,
  handleDeleteTea,
}: TeaLineProps): JSX.Element => {
  console.log(tea);
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
      <div className="grid w-full px-2 py-3 my-3 rounded-md grid-cols-teaLineLayout hover:bg-bgPaper">
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <p className="text-lg text-center text-accent">{name}</p>
            <p className="ml-2 text-base text-center text-textSecondary">
              {brand.name}
            </p>
          </div>
          {!!country || !!flavor ? (
            <div className="flex items-baseline mt-1">
              <p className=" text-textPrimary">
                {!!country ? `${country} | ` : null} {flavor}
              </p>
            </div>
          ) : null}

          {drinking_conditions ? (
            <p className="mt-1 text-sm text-textPrimary">
              {drinking_conditions}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-center w-full h-full">
          <TeaIcon className="w-5 h-5 mr-1 fill-current text-textSecondary" />

          <p className="text-textPrimary"> {formatTime(brand_time_s)}</p>
        </div>

        <div className="flex items-center justify-center w-full h-full">
          <TemperatureIcon className="w-5 h-5 mr-1 fill-current text-textSecondary" />

          <p className="text-textPrimary">{brand_temperature}</p>
        </div>

        <div className="flex items-center justify-end w-full h-full">
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
