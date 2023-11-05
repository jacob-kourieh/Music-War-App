import React, { useState, useContext } from 'react';
import { Box, CircularProgress, TextField, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useFetchArtists, useDeleteArtist } from '../../Services/gameService';
import { Artist } from '../../Types/gameTypes';
import AppContext from '../../Context/AppContext';

const Artists: React.FC = () => {
    const { data: artists, isLoading } = useFetchArtists();
    const deleteArtistMutation = useDeleteArtist();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { setSelectedArtist } = useContext(AppContext);

    const handleDeleteArtist = (artistId: string) => {
        if (window.confirm("Are you sure you want to delete this artist?")) {
            deleteArtistMutation.mutate(artistId);
        }
    };

    const handleShowMore = (artist: Artist) => {
        setSelectedArtist(artist);
    };

    const filteredArtists = artists?.filter((artist) => {
        return (
            artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.genres.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <TextField
                label="Search Artist /Nationality /Genres"
                variant="outlined"
                fullWidth
                onChange={(event) => setSearchTerm(event.target.value)}
                margin="normal"
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {filteredArtists?.length ? filteredArtists.map((artist) => (
                    <Card key={artist._id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={artist.imgName}
                            alt={artist.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {artist.name}
                            </Typography>
                            <Box>
                                <IconButton
                                    onClick={() => {
                                        if (artist._id) {
                                            handleDeleteArtist(artist._id)
                                        } else {
                                            console.error('Artist ID is missing');
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleShowMore(artist)}
                                >
                                    <InfoIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                )) : <Typography>No artists found.</Typography>}
            </Box>
        </Box>
    );
};

export default Artists;
