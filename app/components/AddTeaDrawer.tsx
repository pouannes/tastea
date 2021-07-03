import { useRef, useReducer, useEffect, useState } from 'react';

import _ from 'lodash';

import { TextField, Select, Drawer, Button } from '@/components/core';
import { tea, teaType, brand, fullTea } from '@/types/api';
import { supabase } from '@/utils';

type mode = 'edit' | 'add';
interface AddTeaDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  teaTypes: teaType[];
  teaBrands: brand[];
  setTeas: React.Dispatch<React.SetStateAction<tea[] | null>>;
  mode: mode;
  editTea?: fullTea;
}

const initialState = {
  name: '',
  brand: '',
  type: '',
  flavor: '',
  time: '',
  temperature: '',
  country: '',
  drinkingConditions: '',
};

type ACTION_TYPE =
  | { type: 'SET_FIELD'; payload: { field: string; value: string } }
  | { type: 'RESET' }
  | { type: 'INITIALIZE'; payload: typeof initialState };

const reducer = (state: typeof initialState, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, ...action.payload };
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
};

const AddTeaDrawer = ({
  open,
  setOpen,
  teaTypes,
  teaBrands,
  setTeas,
  mode,
  editTea,
}: AddTeaDrawerProps): JSX.Element => {
  const nameInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(mode);
  console.log(editTea);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: 'SET_FIELD',
      payload: { field: e.target.name, value: e.target.value },
    });

  const handleSelectChange = (name: string, value: string) => {
    dispatch({
      type: 'SET_FIELD',
      payload: { field: name, value: value },
    });
  };

  const handleSave = async (): Promise<tea[] | null> => {
    setLoading(true);
    const newTea = {
      name: state.name,
      brand_id: teaBrands.find((brand) => brand.name === state.brand)?.id,
      tea_type_id: teaTypes.find((type) => type.type === state.type)?.id,
      brand_time_s: state.time,
      brand_temperature: state.temperature,
      country: state.country,
      drinking_conditions: state.drinkingConditions,
      flavor: state.flavor,
    };
    const { data, error } =
      mode === 'add'
        ? await supabase.from('teas').insert([newTea])
        : await supabase.from('teas').update(newTea).eq('id', editTea?.id);
    setLoading(false);
    if (!error && !!data && data.length > 0) {
      const tea = {
        ...data[0],
        type: { type: state.type },
        brand: { name: state.brand },
      };
      setTeas((teas) =>
        mode === 'add'
          ? teas !== null
            ? [...teas, tea]
            : [tea]
          : teas?.map((item) => (item.id === editTea?.id ? tea : item)) ?? []
      );
      setOpen(false);
      dispatch({ type: 'RESET' });
    }
    return data;
  };

  // initialize type with first option
  useEffect(() => {
    if (mode === 'add') {
      dispatch({
        type: 'SET_FIELD',
        payload: { field: 'type', value: teaTypes[0].type },
      });
      dispatch({
        type: 'SET_FIELD',
        payload: { field: 'brand', value: teaBrands[0].name },
      });
    } else {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          name: editTea?.name ?? '',
          brand: editTea?.brand.name ?? 'Autre',
          type: editTea?.type.type,
          time: String(editTea?.brand_time_s) ?? '',
          temperature: editTea?.brand_temperature ?? '',
          country: editTea?.country ?? '',
          drinkingConditions: editTea?.drinking_conditions ?? '',
          flavor: editTea?.flavor ?? '',
        },
      });
    }
  }, [teaTypes, teaBrands, editTea, mode]);

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title={mode === 'add' ? 'Add new tea' : `Edit tea "${editTea?.name}"`}
      initialFocus={nameInputRef}
      Footer={
        <DrawerFooter
          handleClose={() => setOpen(false)}
          handleSave={handleSave}
          loading={loading}
          mode={mode}
        />
      }
    >
      <TextField
        value={state.name}
        onChange={handleChange}
        name="name"
        label="Name"
        className="mb-5"
        inputRef={nameInputRef}
        required
      />
      <Select
        value={state.brand}
        onChange={(value) => handleSelectChange('brand', value)}
        label="Brand"
        name="brand"
        className="mb-5"
        required={true}
        options={teaBrands.map((brand) => ({
          value: brand.name,
          label: _.startCase(brand.name),
        }))}
      />
      <Select
        value={state.type}
        onChange={(value) => handleSelectChange('type', value)}
        label="Type"
        name="type"
        className="mb-5"
        required={true}
        options={teaTypes.map((tea) => ({
          value: tea.type,
          label: _.startCase(tea.type),
        }))}
      />
      <TextField
        value={state.flavor}
        onChange={handleChange}
        name="flavor"
        label="Flavor"
        className="mb-5"
      />
      <TextField
        value={state.time}
        onChange={handleChange}
        name="time"
        label="Brand-advised brewing time (in seconds)"
        className="mb-5"
      />
      <TextField
        value={state.temperature}
        onChange={handleChange}
        name="temperature"
        label="Brand-advised temperature"
        className="mb-5"
      />
      <TextField
        value={state.country}
        onChange={handleChange}
        name="country"
        label="Country of origin"
        className="mb-5"
      />
      <TextField
        value={state.drinkingConditions}
        onChange={handleChange}
        name="drinkingConditions"
        label="Drinking conditions"
        className="mb-5"
      />
    </Drawer>
  );
};

interface DrawerFooterProps {
  handleClose: () => void;
  handleSave: () => void;
  loading: boolean;
  mode: mode;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({
  handleClose,
  handleSave,
  loading,
  mode,
}) => {
  return (
    <div className="flex items-center justify-end px-4 py-4 sm:px-6 bg-bgPaper">
      <Button className="mr-4 text-textSecondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="accent" onClick={handleSave} loading={loading}>
        {mode === 'add' ? 'Save' : 'Update'}
      </Button>
    </div>
  );
};

export default AddTeaDrawer;
