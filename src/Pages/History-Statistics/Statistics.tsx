import React from 'react';
import { CircularProgress, List, ListItem, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useFetchLosers, useFetchWinners } from '../../Services/gameService';


const Statistics: React.FC = () => {
    const { data: winners, isLoading: isLoadingWinners } = useFetchWinners();
    const { data: losers, isLoading: isLoadingLosers } = useFetchLosers();

    if (isLoadingWinners || isLoadingLosers) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top 5 Winners
            </Typography>
            <List>
                {winners?.slice(0, 5).map((winner, index) => (
                    <ListItem key={index}>
                        <Card sx={{ display: 'flex', marginBottom: '10px' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={winner.imgName}
                                alt={winner.name}
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {winner.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Wins: {winner.wins}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h4" gutterBottom>
                Top 5 Losers
            </Typography>
            <List>
                {losers?.slice(0, 5).map((loser, index) => (
                    <ListItem key={index}>
                        <Card sx={{ display: 'flex', marginBottom: '10px' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={loser.imgName}
                                alt={loser.name}
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {loser.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Defeats: {loser.defeats}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Statistics;
