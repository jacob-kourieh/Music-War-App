import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Typography, Container, Box } from '@mui/material';
import { useFetchUserData } from '../../Services/dashboardService';
import Artist from './Artist';
import Match from './Match';
import Song from './Song';

const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState('Match');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const { data: userData, isError, error } = useFetchUserData(username);

    if (isError) {
        console.error(error);
        alert('Failed to fetch user data.');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/signin');
    };

    return (
        <Container maxWidth="md">
            <Box mt={3} textAlign="center">
                <Typography variant="h3" gutterBottom>
                    My Dashboard
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Welcome, {userData?.username}
                </Typography>
            </Box>
            <Box mt={2} mb={3} textAlign="center">
                <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                    <Button onClick={() => setSelectedComponent("Match")}>Matches</Button>
                    <Button onClick={() => setSelectedComponent("Artist")}>Artists</Button>
                    <Button onClick={() => setSelectedComponent("Song")}>Songs</Button>
                </ButtonGroup>
            </Box>
            <Box mt={3}>
                {selectedComponent === "Artist" && <Artist />}
                {selectedComponent === "Match" && <Match />}
                {selectedComponent === "Song" && <Song />}
            </Box>
            <Box mt={3} textAlign="center">
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Log Out
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
