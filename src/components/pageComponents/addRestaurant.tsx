// components/AddRestaurantForm.tsx
import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Alert, MenuItem, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { addRestaurant } from '@/lib/api';
import { 
  PricePositive, 
  NameRequired, 
  DescRequired,
  LocationRequired,
  PriceRequired,
  MenuRequired
} from '@/data/errors.json';

interface Menu {
  name: string;
  price: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required(NameRequired), 
  description: Yup.string().required(DescRequired),
  location: Yup.string().required(LocationRequired),
  menus: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(MenuRequired),
      price: Yup.number().required(PriceRequired).positive(PricePositive),
    })
  ),
});

const AddRestaurantForm: React.FC = () => {
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');

  return (
    <Formik
      initialValues={{ name: '', description: '', location: '', menus: [{ name: '', price: '' }] }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addRestaurant(values);
          setAlertMsg('Restaurant added successfully');
          setAlertType('success');
          resetForm();
        } catch (error: any) {
          setAlertMsg(error.message);
          setAlertType('error');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          {alertMsg && <Alert severity={alertType} sx={{mb:2}}>{alertMsg}</Alert>}
          <Box marginBottom={2}>
            <Field
              as={TextField}
              name="name"
              label="Name"
              fullWidth
              helperText={<ErrorMessage name="name" />}
              error={Boolean(errors.name)}
            />
          </Box>
          <Box marginBottom={2}>
            <Field
              as={TextField}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              helperText={<ErrorMessage name="description" />}
              error={Boolean(errors.description)}
            />
          </Box>
          <Box marginBottom={2}>
            <Field
              as={TextField}
              name="location"
              label="Location"
              fullWidth
              helperText={<ErrorMessage name="location" />}
              error={Boolean(errors.location)}
            />
          </Box>
          <FieldArray name="menus">
            {({ push, remove }) => (
              <>
                {values.menus.map((menu, index) => (
                  <Box key={index} display="flex" alignItems="center" marginBottom={2}>
                    <Box flex={1} marginRight={1}>
                      <Field
                        as={TextField}
                        name={`menus[${index}].name`}
                        label="Menu Name"
                        fullWidth
                        helperText={<ErrorMessage name={`menus[${index}].name`} />}
                      />
                    </Box>
                    <Box flex={1} marginRight={1}>
                      <Field
                        as={TextField}
                        name={`menus[${index}].price`}
                        label="Price"
                        fullWidth
                        type="number"
                        helperText={<ErrorMessage name={`menus[${index}].price`} />}
                      />
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => remove(index)}
                      disabled={isSubmitting || values.menus.length === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {index === values.menus.length - 1 && (
                      <IconButton
                        aria-label="add"
                        onClick={() => push({ name: '', price: '' })}
                        disabled={isSubmitting}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </>
            )}
          </FieldArray>
          <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>
            Add Restaurant
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRestaurantForm;
