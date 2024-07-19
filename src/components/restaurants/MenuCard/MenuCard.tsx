// components/MenuCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MenuCardProps {
  name: string;
  price: number;
  description: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, price, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1">
          ${price.toFixed(2)}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
