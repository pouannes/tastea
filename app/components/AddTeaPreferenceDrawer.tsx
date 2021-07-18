import { useRef, useEffect, useState, useMemo } from 'react';

import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField, Drawer, Button, TeaRating } from '@/components/core';
import { tea, user, fullTea, preference } from '@/types/api';
import { supabase } from '@/utils';
import useActionOnCtrlEnter from '@/hooks';

type mode = 'edit' | 'add';
interface AddTeaPreferenceProps {
  open: boolean;
  handleClose: () => void;
  setUserPreferences: React.Dispatch<React.SetStateAction<preference[] | null>>;
  userPreference: preference | undefined;
  editTea?: fullTea;
  loggedUser: user | null;
}

const validationSchema = yup.object({
  temperature: yup
    .number()
    .typeError('Temperature must be a number')
    .min(0, 'Temperature can not be below 0 degrees')
    .max(100, 'Temperature can not be above 100 degrees'),
  time: yup
    .number()
    .typeError('Time must be a number')
    .min(30, 'Time can not be below 30 seconds')
    .max(600, 'Time can not be above 10 minutes'),
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
  loggedUser,
  editTea,
}: AddTeaPreferenceProps): JSX.Element => {
  const nameInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    return {
      time: !!userPreference?.time_s ? String(userPreference?.time_s) : '',
      temperature: !!userPreference?.temperature
        ? String(userPreference?.temperature)
        : '',
      rating: userPreference?.rating ?? 3,
    };
  }, [userPreference]);

  const mode = useMemo(
    () => (userPreference ? 'edit' : 'add'),
    [userPreference]
  );

  // handle submitting, either editing the tea or saving a new one
  const handleSave = async (
    values: typeof initialValues
  ): Promise<tea[] | null> => {
    if (open) {
      setLoading(true);
      const newPreference = {
        time_s: values.time.length > 0 ? values.time : undefined,
        temperature:
          values.temperature.length > 0 ? values.temperature : undefined,
        rating: values.rating,
        tea_id: editTea?.id,
        user_id: loggedUser?.id,
      };

      const { data, error } =
        mode === 'add'
          ? await supabase.from('preferences').insert([newPreference])
          : await supabase
              .from('preferences')
              .update(newPreference)
              .eq('id', userPreference?.id);
      setLoading(false);
      console.log(data);
      if (!error && !!data && data.length > 0) {
        setUserPreferences((preferences) =>
          mode === 'add'
            ? preferences !== null
              ? [...preferences, data[0]]
              : [data[0]]
            : preferences?.map((item) =>
                item.id === userPreference?.id ? data[0] : item
              ) ?? []
        );
        handleClose();
        resetForm({ values: initialValues });
      }
      return data;
    }
    return null;
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

  useActionOnCtrlEnter(handleSubmit);

  return (
    <Drawer
      open={open}
      handleClose={handleClose}
      title={
        <div>
          <p>
            {mode === 'add' ? 'Add' : 'Edit'} {`${loggedUser?.first_name}'s`}{' '}
            preference: <span className="text-accent">{editTea?.name}</span>
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
          mode={mode}
        />
      }
    >
      <TextField
        value={values.time}
        onChange={handleChange}
        error={touched.time && Boolean(errors.time)}
        helperText={touched.time ? errors.time : undefined}
        name="time"
        label={`${loggedUser?.first_name}'s brewing time (in seconds)`}
        className="mb-5"
        inputRef={nameInputRef}
      />
      <TextField
        value={values.temperature}
        onChange={handleChange}
        error={touched.temperature && Boolean(errors.temperature)}
        helperText={touched.temperature ? errors.temperature : undefined}
        name="temperature"
        label={`${loggedUser?.first_name}'s temperature`}
        className="mb-5"
      />
      <TeaRating
        value={values.rating}
        setValue={(value) => setFieldValue('rating', value)}
        size="lg"
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
        color="accent"
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
