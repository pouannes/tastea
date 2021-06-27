import { useRef, useReducer } from 'react';

import { TextField, Drawer, DrawerProps } from '@/components/core';

interface AddTeaDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const initialState = {
  name: '',
  brand: '',
  type: '',
  flavor: '',
};

type ACTION_TYPE =
  | { type: 'SET_FIELD'; payload: { field: string; value: string } }
  | { type: 'RESET' };

const reducer = (state: typeof initialState, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
};

const AddTeaDrawer: React.FC<AddTeaDrawerProps> = ({ open, setOpen }) => {
  const nameInputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: 'SET_FIELD',
      payload: { field: e.target.name, value: e.target.value },
    });

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title="Add new tea"
      initialFocus={nameInputRef}
    >
      <TextField
        value={state.name}
        onChange={handleChange}
        name="name"
        label="Name"
        inputClassName="mb-5"
        inputRef={nameInputRef}
      />
      <TextField
        value={state.brand}
        onChange={handleChange}
        name="brand"
        label="Brand"
        inputClassName="mb-5"
      />
      <TextField
        value={state.type}
        onChange={handleChange}
        name="type"
        label="Type"
        inputClassName="mb-5"
      />
      <TextField
        value={state.flavor}
        onChange={handleChange}
        name="flavor"
        label="Flavor"
        inputClassName="mb-5"
      />
    </Drawer>
  );
};

export default AddTeaDrawer;
