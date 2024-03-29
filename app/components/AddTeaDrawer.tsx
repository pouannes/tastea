import { useRef, useEffect, useState, useMemo } from 'react';

import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  TextField,
  Select,
  Drawer,
  Button,
  TagTextField,
  Checkbox,
} from '@/components/core';
import { tea, teaType, brand, fullTea } from '@/types/api';
import { supabase } from '@/utils';
import { useTagContext, useTeasContext } from 'app/contexts';
import useActionOnCtrlEnter from '@/hooks';

type mode = 'edit' | 'add';
interface AddTeaDrawerProps {
  open: boolean;
  handleClose: () => void;
  teaTypes: teaType[];
  teaBrands: brand[];
  mode?: mode;
  editTea?: fullTea;
}

const validationSchema = yup.object({
  name: yup.string().required('Tea name is required'),
  brand: yup.string().required('Tea brand is required'),
  type: yup.string().required('Tea type is required'),
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
  country: yup.string(),
  tag: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string(),
    })
  ),
  url: yup.string().url(),
  isInStock: yup.bool(),
});

const AddTeaDrawer = ({
  open,
  handleClose,
  teaTypes,
  teaBrands,
  mode,
  editTea,
}: AddTeaDrawerProps): JSX.Element => {
  const { triggerFetchTeas } = useTeasContext();
  const tags = useTagContext();

  const nameInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    return mode === 'add'
      ? {
          name: '',
          brand: teaBrands[0].name,
          type: teaTypes[0].type,
          time: '',
          temperature: '',
          country: '',
          tagIds: [],
          url: '',
          isInStock: false,
        }
      : {
          name: editTea?.name ?? '',
          brand: editTea?.brand.name ?? 'Autre',
          type: editTea?.type.type,
          time: String(editTea?.brand_time_s) ?? '',
          temperature: editTea?.brand_temperature ?? '',
          country: editTea?.country ?? '',
          tagIds: editTea?.tag_ids ?? [],
          url: editTea?.product_url ?? '',
          isInStock: editTea?.is_in_stock ?? false,
        };
  }, [editTea, teaBrands, teaTypes, mode]);

  // handle submitting, either editing the tea or saving a new one
  const handleSave = async (
    values: typeof initialValues
  ): Promise<tea[] | null> => {
    if (open) {
      setLoading(true);
      const newTea = {
        name: values.name,
        brand_id: teaBrands.find((brand) => brand.name === values.brand)?.id,
        tea_type_id: teaTypes.find((type) => type.type === values.type)?.id,
        brand_time_s: values.time,
        brand_temperature: values.temperature,
        country: values.country,
        tag_ids: values.tagIds,
        product_url: values.url,
        is_in_stock: values.isInStock,
      };
      const { data, error } =
        mode === 'add'
          ? await supabase.from('teas').insert([newTea])
          : await supabase.from('teas').update(newTea).eq('id', editTea?.id);
      setLoading(false);
      if (!error && !!data && data.length > 0) {
        triggerFetchTeas();

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
        mode === 'add' ? (
          'Add new tea'
        ) : (
          <div>
            <p>
              Edit tea <span className="text-accent">{values?.name}</span>
            </p>
            <p className="text-textSecondary">{values?.brand}</p>
          </div>
        )
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
        value={values.name}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name ? errors.name : undefined}
        name="name"
        label="Name"
        className="mb-5"
        inputRef={nameInputRef}
        required
      />
      <Select
        value={values.brand}
        onChange={(value) => setFieldValue('brand', value)}
        error={touched.brand && Boolean(errors.brand)}
        helperText={touched.brand ? errors.brand : undefined}
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
        error={touched.type && Boolean(errors.type)}
        helperText={
          touched.type && Boolean(errors.type) ? String(errors.type) : undefined
        }
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
        value={values.country}
        onChange={handleChange}
        error={touched.country && Boolean(errors.country)}
        helperText={touched.country ? errors.country : undefined}
        name="country"
        label="Country of origin"
        className="mb-5"
      />
      <TagTextField
        selectedTags={tags.filter((tag) => values.tagIds.includes(tag.id))}
        setSelectedTags={(tags) =>
          setFieldValue(
            'tagIds',
            tags.map((tag) => tag.id)
          )
        }
        name="tagIds"
        className="mb-5"
        label="Tags"
      />
      <TextField
        value={values.time}
        onChange={handleChange}
        error={touched.time && Boolean(errors.time)}
        helperText={touched.time ? errors.time : undefined}
        name="time"
        label="Brand-advised brewing time (in seconds)"
        className="mb-5"
        required={true}
      />
      <TextField
        value={values.temperature}
        onChange={handleChange}
        error={touched.temperature && Boolean(errors.temperature)}
        helperText={touched.temperature ? errors.temperature : undefined}
        name="temperature"
        label="Brand-advised temperature"
        className="mb-5"
        required={true}
      />
      <TextField
        value={values.url}
        onChange={handleChange}
        error={touched.url && Boolean(errors.url)}
        helperText={touched.url ? errors.url : undefined}
        name="url"
        label="Product url"
        className="mb-5"
        required={true}
      />
      <Checkbox
        checked={values.isInStock}
        toggleCheck={() => setFieldValue('isInStock', !values.isInStock)}
        name="isInStock"
        label="Is this tea in stock?"
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

export default AddTeaDrawer;
