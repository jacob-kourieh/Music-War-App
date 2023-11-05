import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchUserData, useRemoveFavoriteArtist } from '../../Services/dashboardService';

const Artist = () => {
    const username = localStorage.getItem('username');
    const { data: userData } = useFetchUserData(username);
    const { mutate: removeArtist } = useRemoveFavoriteArtist();

    const handleRemoveArtist = (artistId: string) => {
        removeArtist({ artistId });
    };

    return (
        <Grid container spacing={3}>
            {userData?.favoriteArtists.map((artist, index) => (
                <Grid item xs={12} sm={6} md={4} key={artist._id}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: 280, objectFit: 'cover' }}
                            image={artist.imgName} // Ensure this is the correct path to the image file
                            alt={artist.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div" noWrap>
                                {artist.name}
                            </Typography>
                        </CardContent>
                        <IconButton
                            onClick={() => handleRemoveArtist(artist._id)}
                            color="secondary"
                            sx={{ alignSelf: 'flex-end', m: 1 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Artist;
