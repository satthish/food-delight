import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import AddRestaurantForm from '@/components/pageComponents/addRestaurant';
import Title from '@/components/basic/Title/Title';
import {Add} from '@/data/titles.json';
import SeoTitle from '@/components/basic/SeoTitle/SeoTitle';

const Home: React.FC = () => {
  return (
      <Container>
        <SeoTitle title={Add} />
        <Title 
          content={Add} 
          variant='h4' 
          align='center' 
          sx={{
            pt:1,
            pb:3, 
            fontWeight:"bold"
          }} 
        />
        <AddRestaurantForm />
      </Container>
  );
};

export default Home;
