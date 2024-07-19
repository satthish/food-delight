// pages/api/getRestaurant/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import hotels from '@/data/hotels.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const restaurant = hotels.find((hotel) => hotel.id === Number(id));

  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }

  return res.status(200).json(restaurant);
}
