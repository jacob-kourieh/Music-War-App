import React, { useContext } from 'react';
import { useFetchRandomArtists, useUpdateWinner, useUpdateLoser, usePostMatch } from '../../Services/gameService';
import { CircularProgress, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import AppContext from '../../Context/AppContext';

const Battle: React.FC = () => {
    const { data: artists, isLoading, refetch } = useFetchRandomArtists();
    const updateWinner = useUpdateWinner();
    const updateLoser = useUpdateLoser();
    const postMatch = usePostMatch();

    const { setWinnerId } = useContext(AppContext);

    const handleVote = async (winnerIndex: number) => {
        if (artists) {
            const winner = artists[winnerIndex];
            const loser = artists[(winnerIndex + 1) % artists.length];

            if (winner._id && loser._id) {
                await updateWinner.mutateAsync(winner);
                await updateLoser.mutateAsync(loser);
                await postMatch.mutateAsync({ winner: winner._id, loser: loser._id });

                setWinnerId(winner._id);

                refetch();
            } else {
                console.error('Invalid artist ID');
            }
        }
    };

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            {artists && artists.map((artist, index) => (
                <Grid item key={artist._id} xs={12} md={6}>
                    <Card>
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
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => handleVote(index)}
                            >
                                Vote
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {artists && artists.length === 2 && (
                <Typography variant="h3" component="div" sx={{ textAlign: 'center', width: '100%', mt: 2 }}>
                    VS
                </Typography>
            )}
        </Grid>
    );
};

export default Battle;
