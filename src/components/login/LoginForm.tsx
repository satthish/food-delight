import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import { loginUser } from '@/lib/api';
import { EmptyName, EmptyPassword } from '@/data/errors.json';

const validationSchema = Yup.object({
  username: Yup.string().required(EmptyName),
  password: Yup.string().required(EmptyPassword),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [alertMsg, setAlertMsg] = useState<string>('');

  return (
      <>
          {alertMsg && <Alert severity="error" sx={{mb:1}}>{alertMsg}</Alert>}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const data = await loginUser(values.username, values.password);
                dispatch(login({ username: data.username, email: data.email }));
                router.push('/');
              } catch (error: any) {
                setAlertMsg(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box marginBottom={2}>
                  <Field
                    as={TextField}
                    name="username"
                    placeholder="Username"
                    fullWidth
                    helperText={<ErrorMessage name="username" />}
                    error={Boolean(ErrorMessage.name === 'username')}
                  />
                </Box>
                <Box marginBottom={2}>
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    error={Boolean(ErrorMessage.name === 'password')}
                  />
                </Box>
                <Button 
                  type="submit" 
                  color="primary" 
                  variant="contained" 
                  fullWidth 
                  disabled={isSubmitting}
                >
                  Login
                </Button>
                <Typography>admin/admin123</Typography>
              </Form>
            )}
          </Formik>
        </>
  );
};

export default LoginForm;
