import React from 'react';
import { CircularProgress, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useDeleteMatch, useFetchArtists, useFetchMatches } from '../../Services/gameService';


const History: React.FC = () => {
    const { data: matches, isLoading: isLoadingMatches } = useFetchMatches();
    const { data: artists, isLoading: isLoadingArtists } = useFetchArtists();
    const deleteMatch = useDeleteMatch();

    const handleDeleteMatch = (matchId: string) => {
        deleteMatch.mutate(matchId);
    };


    if (isLoadingMatches || isLoadingArtists) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            {matches?.map((match) => {
                const winner = artists?.find((artist) => artist._id === match.winner);
                const loser = artists?.find((artist) => artist._id === match.loser);

                if (!winner || !loser) {
                    return null;
                }

                return (
                    <Grid item xs={12} sm={6} md={4} key={match._id}>
                        <Card raised>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Match History
                                </Typography>
                                <div>
                                    <EmojiEventsIcon fontSize="large" />
                                    <Typography variant="subtitle1">Winner: {winner.name}</Typography>
                                    <img src={winner.imgName} alt="winner" style={{ width: '100%', height: 'auto' }} />
                                </div>
                                <div>
                                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                                    <Typography variant="subtitle1">Loser: {loser.name}</Typography>
                                    <img src={loser.imgName} alt="loser" style={{ width: '100%', height: 'auto' }} />
                                </div>
                                <Button variant="contained" color="error" onClick={() => handleDeleteMatch(match._id)}>
                                    Delete Match
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default History;
