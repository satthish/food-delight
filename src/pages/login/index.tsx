//Login Page for admin with Mock data to login
import React from 'react';
import { Card, Box } from '@mui/material';
import Title from '@/components/basic/Title/Title';
import SeoTitle from '@/components/basic/SeoTitle/SeoTitle';
import LoginForm from '@/components/login/LoginForm';
import { AdminLogin } from '@/data/titles.json';

const Login: React.FC = () => {
  return (
    <>
      <SeoTitle title={AdminLogin} />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <Card 
          style={{ 
            padding: '20px', 
            maxWidth: '400px', 
            width: '100%' 
          }}
        >
          <Title 
            content={AdminLogin} 
            variant='h6' 
            align='center' 
            sx={{
              pt:1,
              pb:3, 
              fontWeight:"bold"
            }} 
          />
          <LoginForm />
        </Card>
      </Box>
    </>
  );
};

export default Login;
