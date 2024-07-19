import type { NextApiRequest, NextApiResponse } from 'next';
import restaurants from '@/data/hotels.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const restaurantId = parseInt(id as string, 10);

    const index = restaurants.findIndex((r) => r.id === restaurantId);
    if (index === -1) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurants.splice(index, 1);

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
