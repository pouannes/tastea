import { useState } from 'react';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

import { tea } from '@/types/api';
import { formatTime } from '@/utils';
import { IconButton, ConfirmationDialog } from '@/components/core';

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
  const { name, brand_time_s, brand_temperature, brand } = tea;

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  return (
    <div className="grid w-full grid-cols-5 py-2 border-t">
      <p className="text-textPrimary">{name}</p>
      <p className="text-textPrimary">{brand.name}</p>
      <p className="text-textPrimary">{formatTime(brand_time_s)}</p>
      <p className="text-textPrimary">{brand_temperature}</p>
      <div className="flex items-center">
        <IconButton srName="Edit tea" onClick={() => handleOpenEditDrawer(tea)}>
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
  );
};

export default TeaLine;
