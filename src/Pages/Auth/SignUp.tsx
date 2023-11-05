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
import { useSignUp } from '../../Services/authService';
import ConfirmDialog from './ConfirmDialog';
import { SignUpRequest } from '../../Types/authTypes';

const defaultTheme = createTheme();

interface SignUpFormData extends SignUpRequest {
    acceptedConditions: boolean;
}

export default function SignUp() {
    const navigate = useNavigate();
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = useState('');
    const [confirmDialogMessage, setConfirmDialogMessage] = useState('');
    const signUpMutation = useSignUp();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        defaultValues: {
            username: '',
            password: '',
            acceptedConditions: false,
        },
        mode: 'onChange',
    });

    const showConfirmDialog = (title: string, message: string, onConfirmCallback: () => void) => {
        setConfirmDialogTitle(title);
        setConfirmDialogMessage(message);
        setIsConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setIsConfirmDialogOpen(false);
    };

    const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
        if (!data.acceptedConditions) {
            showConfirmDialog(
                'Terms and Conditions',
                'You must accept the terms and conditions to proceed.',
                () => { }
            );
            return;
        }

        signUpMutation.mutate(
            { username: data.username, password: data.password },
            {
                onSuccess: () => {
                    navigate('/dashboard');
                },
                onError: (error) => {
                    if (error.response && error.response.status === 409) {
                        showConfirmDialog(
                            'Account Exists',
                            'An account with this username already exists. Please sign in.',
                            () => navigate('/signin')
                        );
                    } else {
                        showConfirmDialog(
                            'Signup Failed',
                            'Signup failed. Please check your input and try again.',
                            () => { }
                        );
                        console.error(error);
                    }
                }
            }
        );
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="username"
                                    control={control}
                                    rules={{ required: 'Please enter your username' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            autoComplete="username"
                                            error={Boolean(errors.username)}
                                            helperText={errors.username?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: 'Please enter your password' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="acceptedConditions"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} color="primary" />}
                                            label="I accept the terms and conditions"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title={confirmDialogTitle}
                onConfirm={handleCloseConfirmDialog}
                onCancel={handleCloseConfirmDialog}
            >
                {confirmDialogMessage}
            </ConfirmDialog>
        </ThemeProvider>
    );
}
