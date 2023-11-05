import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '../../Services/authService';
import ConfirmDialog from './ConfirmDialog';
import { SignInRequest } from '../../Types/authTypes';

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmDialogMessage, setConfirmDialogMessage] = useState('');
    const signInMutation = useSignIn();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInRequest>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
    });

    const showConfirmDialog = (message: string, onConfirmCallback: () => void) => {
        setConfirmDialogMessage(message);
        setIsConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setIsConfirmDialogOpen(false);
    };

    const onSubmit: SubmitHandler<SignInRequest> = (data) => {
        signInMutation.mutate(data, {
            onSuccess: () => {
                navigate('/dashboard');
            },
            onError: (error) => {
                if (error.response && error.response.status === 401) {
                    showConfirmDialog(
                        'Invalid username or password. If you do not have an account, please sign up.',
                        () => navigate('/signup')
                    );
                } else {
                    showConfirmDialog('Login failed. Please try again.', () => { });
                    console.error(error);
                }
            }
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: 'Please enter your username' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                    error={Boolean(errors.username)}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Please enter your password' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                onConfirm={handleCloseConfirmDialog}
                onCancel={handleCloseConfirmDialog}
            >
                {confirmDialogMessage}
            </ConfirmDialog>
        </ThemeProvider>
    );
}
