import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Grid, Button } from '@mui/material';
import { getRestaurantById, updateRestaurant } from '@/lib/api';
import Title from '@/components/basic/Title/Title';
import MenuCard from '@/components/restaurants/MenuCard/MenuCard';
import SeoTitle from '@/components/basic/SeoTitle/SeoTitle';
import EditFormDialog from '@/components/restaurants/EditRestaurant';

const RestaurantDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const fetchedRestaurant = await getRestaurantById(Number(id));
        setRestaurant(fetchedRestaurant);
      } catch (error) {
        console.error('Failed to fetch restaurant:', error);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = async (updatedRestaurant?: any) => {
    setEditDialogOpen(false);
    if (updatedRestaurant) {
      try {
        const updated = await updateRestaurant(Number(id), updatedRestaurant);
        setRestaurant(updated);
      } catch (error) {
        console.error('Failed to update restaurant:', error);
      }
    }
  };

  if (!restaurant) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <SeoTitle title={restaurant.name} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title content={restaurant.name} variant="h4" align="center" sx={{ pt: 1, pb: 1, fontWeight: 'bold' }} />
          <Title content={restaurant.description} variant="body1" align="center" sx={{ pt: 1, pb: 0 }} />
          <Title content={restaurant.location} variant="body2" align="center" sx={{ pt: 1, pb: 0 }} />
          <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ mt: 2 }}>
            Edit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Title content="Menus" variant="h6" align="left" sx={{ pt: 1, pb: 0 }} />
          <Grid container spacing={2}>
            {restaurant.menus.map((menu: any) => (
              <Grid item xs={12} sm={12} md={12} key={menu.id}>
                <MenuCard name={menu.name} price={menu.price} description={menu.description} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <EditFormDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        restaurant={restaurant}
      />
    </Container>
  );
};

export default RestaurantDetails;
