import { useRef, useEffect, useState, useMemo } from 'react';

import _ from 'lodash';

import { TextField, Select, Drawer, Button } from '@/components/core';
import { tea, teaType, brand, fullTea } from '@/types/api';
import { supabase } from '@/utils';
import { useFormik } from 'formik';

type mode = 'edit' | 'add';
interface AddTeaDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  teaTypes: teaType[];
  teaBrands: brand[];
  setTeas: React.Dispatch<React.SetStateAction<tea[] | null>>;
  mode?: mode;
  editTea?: fullTea;
}

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

  const initialValues = useMemo(() => {
    return mode === 'add'
      ? {
          name: '',
          brand: teaBrands[0].name,
          type: teaTypes[0].type,
          flavor: '',
          time: '',
          temperature: '',
          country: '',
          drinkingConditions: '',
        }
      : {
          name: editTea?.name ?? '',
          brand: editTea?.brand.name ?? 'Autre',
          type: editTea?.type.type,
          time: String(editTea?.brand_time_s) ?? '',
          temperature: editTea?.brand_temperature ?? '',
          country: editTea?.country ?? '',
          drinkingConditions: editTea?.drinking_conditions ?? '',
          flavor: editTea?.flavor ?? '',
        };
  }, [editTea, teaBrands, teaTypes, mode]);

  // handle submitting, either editing the tea or saving a new one
  const handleSave = async (
    values: typeof initialValues
  ): Promise<tea[] | null> => {
    setLoading(true);
    const newTea = {
      name: values.name,
      brand_id: teaBrands.find((brand) => brand.name === values.brand)?.id,
      tea_type_id: teaTypes.find((type) => type.type === values.type)?.id,
      brand_time_s: values.time,
      brand_temperature: values.temperature,
      country: values.country,
      drinking_conditions: values.drinkingConditions,
      flavor: values.flavor,
    };
    const { data, error } =
      mode === 'add'
        ? await supabase.from('teas').insert([newTea])
        : await supabase.from('teas').update(newTea).eq('id', editTea?.id);
    setLoading(false);
    if (!error && !!data && data.length > 0) {
      const tea = {
        ...data[0],
        type: { type: values.type },
        brand: { name: values.brand },
      };
      setTeas((teas) =>
        mode === 'add'
          ? teas !== null
            ? [...teas, tea]
            : [tea]
          : teas?.map((item) => (item.id === editTea?.id ? tea : item)) ?? []
      );
      setOpen(false);
      resetForm({ values: initialValues });
    }
    return data;
  };

  const { resetForm, values, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: initialValues,

      onSubmit: handleSave,
    });

  // initialize type with first option
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!_.isEqual(values, initialValues) && !hasInitialized.current && open) {
      hasInitialized.current = true;
      resetForm({ values: initialValues });
    }
  }, [resetForm, initialValues, values, open]);

  useEffect(() => {
    if (!open) {
      hasInitialized.current = false;
    }
  }, [open]);

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title={mode === 'add' ? 'Add new tea' : `Edit tea "${editTea?.name}"`}
      initialFocus={nameInputRef}
      Footer={
        <DrawerFooter
          handleClose={() => setOpen(false)}
          handleSave={handleSubmit}
          loading={loading}
          mode={mode}
        />
      }
    >
      <TextField
        value={values.name}
        onChange={handleChange}
        name="name"
        label="Name"
        className="mb-5"
        inputRef={nameInputRef}
        required
      />
      <Select
        value={values.brand}
        onChange={(value) => setFieldValue('brand', value)}
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
        value={values.type}
        onChange={(value) => setFieldValue('type', value)}
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
        value={values.flavor}
        onChange={handleChange}
        name="flavor"
        label="Flavor"
        className="mb-5"
      />
      <TextField
        value={values.time}
        onChange={handleChange}
        name="time"
        label="Brand-advised brewing time (in seconds)"
        className="mb-5"
      />
      <TextField
        value={values.temperature}
        onChange={handleChange}
        name="temperature"
        label="Brand-advised temperature"
        className="mb-5"
      />
      <TextField
        value={values.country}
        onChange={handleChange}
        name="country"
        label="Country of origin"
        className="mb-5"
      />
      <TextField
        value={values.drinkingConditions}
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
  mode?: mode;
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
      <Button
        variant="accent"
        onClick={handleSave}
        loading={loading}
        type="submit"
      >
        {mode === 'add' ? 'Save' : 'Update'}
      </Button>
    </div>
  );
};

export default AddTeaDrawer;
