//MOck api for user login
import type { NextApiRequest, NextApiResponse } from 'next';
import users from '@/data/users.json';

interface LoginRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

export default function handler(req: LoginRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  const user = users.find((user: { username: string; password: string }) => user.username === username && user.password === password);

  if (user) {
    return res.status(200).json({ username: user.username, email: user.email });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
