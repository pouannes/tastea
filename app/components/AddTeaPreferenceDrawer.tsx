import { useRef, useEffect, useState, useMemo } from 'react';

import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField, Select, Drawer, Button } from '@/components/core';
import { tea, teaType, brand, fullTea, preference } from '@/types/api';
import { supabase } from '@/utils';

type mode = 'edit' | 'add';
interface AddTeaPreferenceProps {
  open: boolean;
  handleClose: () => void;
  setUserPreferences: React.Dispatch<React.SetStateAction<preference[] | null>>;
  userPreference: preference | undefined;
  editTea?: fullTea;
}

const validationSchema = yup.object({
  temperature: yup
    .number()
    .typeError('Temperature must be a number')
    .min(0, 'Temperature can not be below 0 degrees')
    .max(100, 'Temperature can not be above 100 degrees')
    .required('Tea brewing temperature is required'),
  time: yup
    .number()
    .typeError('Time must be a number')
    .min(30, 'Time can not be below 30 seconds')
    .max(600, 'Time can not be above 10 minutes')
    .required('Tea brewing time is required'),
  rating: yup
    .number()
    .min(0, 'Rating can not be below 0')
    .max(5, 'Rating can not be above 5')
    .required('Rating is required'),
});

// TODO: I removed "mode" but maybe it's simpler to keep it and infer it from the existence of an existing userPreference
const AddTeaPreference = ({
  open,
  handleClose,
  setUserPreferences,
  userPreference,
  editTea,
}: AddTeaPreferenceProps): JSX.Element => {
  const nameInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    return {
      time: '',
      temperature: '',
      rating: '',
    };
  }, []);

  // handle submitting, either editing the tea or saving a new one
  const handleSave = async (
    values: typeof initialValues
  ): Promise<tea[] | null> => {
    setLoading(true);
    const newPreference = {
      time_s: values.time,
      temperature: values.temperature,
      rating: values.rating,
    };
    const { data, error } = await supabase
      .from('teas')
      .upsert(newPreference)
      .eq('id', editTea?.id);
    setLoading(false);
    if (!error && !!data && data.length > 0) {
      const newPreference = {};
      // TODO modify this to work on mode in some way
      //   setTeas((teas) =>
      //     mode === 'add'
      //       ? teas !== null
      //         ? [...teas, tea]
      //         : [tea]
      //       : teas?.map((item) => (item.id === editTea?.id ? tea : item)) ?? []
      //   );
      handleClose();
      resetForm({ values: initialValues });
    }
    return data;
  };

  const {
    resetForm,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    touched,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
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
      handleClose={handleClose}
      title={
        <div>
          <p>
            Edit tea <span className="text-accent">{editTea?.name}</span>
          </p>
          <p className="text-textSecondary">{editTea?.brand.name}</p>
        </div>
      }
      initialFocus={nameInputRef}
      Footer={
        <DrawerFooter
          handleClose={handleClose}
          handleSave={handleSubmit}
          loading={loading}
          // TODO
          //   mode={mode}
        />
      }
    >
      <TextField
        value={values.time}
        onChange={handleChange}
        error={touched.time && Boolean(errors.time)}
        helperText={touched.time ? errors.time : undefined}
        name="time"
        label="Brand-advised brewing time (in seconds)"
        className="mb-5"
      />
      <TextField
        value={values.temperature}
        onChange={handleChange}
        error={touched.temperature && Boolean(errors.temperature)}
        helperText={touched.temperature ? errors.temperature : undefined}
        name="temperature"
        label="Brand-advised temperature"
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

export default AddTeaPreference;
