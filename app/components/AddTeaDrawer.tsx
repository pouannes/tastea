import { useState } from 'react';

import { TextField, Drawer, DrawerProps } from '@/components/core';

interface props extends DrawerProps {}

const AddTeaDrawer: React.FC<props> = ({ open, setOpen, children }) => {
  const [name, setName] = useState('');

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  return (
    <Drawer open={open} setOpen={setOpen}>
      <TextField
        value={name}
        onChange={handleNameChange}
        name="Name"
        label="Tea name"
      />
    </Drawer>
  );
};

export default AddTeaDrawer;
