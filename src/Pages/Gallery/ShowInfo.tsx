import React, { useContext } from 'react';
import { Card, Typography, Button, Box, Modal } from "@mui/material";
import AppContext from '../../Context/AppContext';

const ShowInfo = () => {

    const { selectedArtist: artist, handleClose } = useContext(AppContext);

    if (!artist) {

        return <Typography variant="h5">Artist not found</Typography>;
    }

    return (
        <Modal
            open={!!artist}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
            }}>
                <Card sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={artist.imgName} alt={artist.name} style={{ width: '100%', height: 'auto' }} />
                        <Typography id="simple-modal-title" variant="h5" gutterBottom>
                            {artist.name}
                        </Typography>
                        <Typography id="simple-modal-description" variant="subtitle1">
                            Age: {artist.age ? `${artist.age} years` : "Unknown"}
                        </Typography>
                        <Typography variant="subtitle1">Nationality: {artist.nationality}</Typography>
                        <Typography variant="subtitle1">Genres: {artist.genres}</Typography>
                        <Typography variant="h6" gutterBottom>Match history</Typography>
                        <Typography variant="body2">Wins: {artist.wins}</Typography>
                        <Typography variant="body2">Games: {artist.games}</Typography>
                        <Typography variant="body2">Defeats: {artist.defeats}</Typography>
                    </Box>
                    <Button onClick={handleClose}>Close</Button>
                </Card>
            </Box>
        </Modal>
    );
};

export default ShowInfo;
