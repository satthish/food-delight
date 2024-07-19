import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { getRestaurants } from '@/lib/api';
import ActionsDropdown from '@/components/restaurants/ActionDropdwn/ActionDropdown';
import EditFormDialog from '@/components/restaurants/EditRestaurantDialog';
import Title from '@/components/basic/Title/Title';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { LandingTitle } from '@/data/titles.json';
import SeoTitle from '@/components/basic/SeoTitle/SeoTitle';

const Home: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [restaurants, setRestaurants] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [isAuthenticated, router]);

  const handleDelete = (id: number) => {
    setRestaurants((prevRestaurants: any[]) => prevRestaurants.filter((restaurant: { id: number; }) => restaurant?.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'location', headerName: 'Location', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <ActionsDropdown id={params.row.id as number} onDelete={handleDelete} />
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <EditFormDialog id={params.row.id as number} onUpdate={() => console.log("Updated")} />
      ),
    },
  ];

  return (
    <Container>
      <SeoTitle title={LandingTitle} />
      <Title 
        content={LandingTitle} 
        variant='h4' 
        align='center' 
        sx={{ 
          pt: 1, 
          pb: 3, 
          fontWeight: "bold" 
        }} 
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={restaurants} columns={columns} />
        </div>
      )}
    </Container>
  );
};

export default Home;
