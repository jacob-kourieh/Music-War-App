import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchUserData, useDeleteMatch } from '../../Services/dashboardService';

const Match = () => {
  const username = localStorage.getItem('username');
  const { data: userData } = useFetchUserData(username);
  const { mutate: deleteMatch } = useDeleteMatch();

  const handleDeleteMatch = (gameId: string) => {
    deleteMatch({ gameId });
  };

  return (
    <Grid container spacing={3}>
      {userData?.gameData.map((game, index) => (
        <Grid item xs={12} sm={6} md={4} key={game.gameId}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                Match {index + 1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You chose {game.chosenArtistName} over {game.loserArtistName}
              </Typography>
            </CardContent>
            <IconButton
              onClick={() => handleDeleteMatch(game.gameId)}
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

export default Match;
