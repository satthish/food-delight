import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { deleteRestaurant } from '@/lib/api';

interface ActionsDropdownProps {
  id: number;
  onDelete: (id: number) => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ id, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowDetails = () => {
    handleCloseMenu();
    router.push(`/restaurant/${id}`);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleDelete = async () => {
    handleCloseMenu();
    try {
      await deleteRestaurant(id);
      setAlertMsg(`Successfully deleted restaurant with ID ${id}`);
      setAlertSeverity('success');
      setAlertOpen(true);
      onDelete(id);
    } catch (error) {
      setAlertMsg('Failed to delete restaurant');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <>
      <IconButton
        aria-label="actions"
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleShowDetails}>Show Details</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ActionsDropdown;
