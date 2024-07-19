import type { NextApiRequest, NextApiResponse } from 'next';
import hotels from '@/data/hotels.json';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  location: string;
}

const restaurants: Restaurant[] = hotels;

export default function handler(req: NextApiRequest, res: NextApiResponse<Restaurant[]>) {
  if (req.method === 'GET') {
    // Assuming you might want to fetch data from a database or mock data
    res.status(200).json(restaurants);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
