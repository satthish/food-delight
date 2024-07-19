import type { NextApiRequest, NextApiResponse } from 'next';

interface AddRestaurantRequest extends NextApiRequest {
  body: {
    name: string;
    description: string;
    location: string;
  };
}

const restaurants = [];

export default function handler(req: AddRestaurantRequest, res: NextApiResponse) {
  const { name, description, location } = req.body;

  if (!name || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newRestaurant = { id: Date.now(), name, description, location };
  restaurants.push(newRestaurant);

  return res.status(200).json(newRestaurant);
}
