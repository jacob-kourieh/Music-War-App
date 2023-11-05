import React, { useContext } from 'react';
import Battle from './Battle';
import ShowWinner from './ShowWinner';
import { Typography, Container, Box } from '@mui/material';
import AppContext from '../../Context/AppContext';

const Play = () => {

    const { winnerId, handleClose } = useContext(AppContext);

    return (
        <Container maxWidth="md">
            <Box textAlign="center" my={4}>
                <Typography variant="h4" gutterBottom>
                    THE GAME
                </Typography>
                <Typography paragraph>
                    The game is a match between two music artists, and you vote for your favorites. The winning artist will get a win point, and the losing artist will get a defeat point.
                </Typography>
            </Box>
            <Battle />
            {winnerId && <ShowWinner artistId={winnerId} closeOverlay={handleClose} />}
        </Container>
    );
};

export default Play;
