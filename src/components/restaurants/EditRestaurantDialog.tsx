import React, { useEffect, useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getRestaurantById, updateRestaurant } from '@/lib/api';

interface EditFormDialogProps {
  id: number;
  onUpdate: () => void; // Callback to trigger a refresh after updating
}

const EditFormDialog: React.FC<EditFormDialogProps> = ({ id, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await getRestaurantById(id);
        setName(restaurant.name);
        setDescription(restaurant.description);
        setLocation(restaurant.location);
      } catch (error) {
        console.error('Failed to fetch restaurant:', error);
      }
    };
    if (open) {
      fetchRestaurant();
    }
  }, [id, open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await updateRestaurant(id, { name, description, location });
      console.log(`Updated restaurant with ID ${id}`);
      handleClose();
      onUpdate();
    } catch (error) {
      console.error('Failed to update restaurant:', error);
      handleClose();
    }
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Restaurant</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditFormDialog;
