import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface EditRestaurantDialogProps {
  open: boolean;
  onClose: (updatedRestaurant?: any) => void;
  restaurant: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
});

const EditRestaurantDialog: React.FC<EditRestaurantDialogProps> = ({ open, onClose, restaurant }) => {
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Restaurant</DialogTitle>
      <Formik
        initialValues={{
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onClose(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="dense"
                variant="outlined"
                required
              />
              <Field
                as={TextField}
                name="description"
                label="Description"
                fullWidth
                margin="dense"
                variant="outlined"
                required
              />
              <Field
                as={TextField}
                name="location"
                label="Location"
                fullWidth
                margin="dense"
                variant="outlined"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onClose()} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditRestaurantDialog;
