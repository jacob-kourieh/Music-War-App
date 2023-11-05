import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useFetchUserData, useRemoveFavoriteSong } from '../../Services/dashboardService';

const Song = () => {
    const username = localStorage.getItem('username');
    const { data: userData } = useFetchUserData(username);
    const { mutate: removeSong } = useRemoveFavoriteSong();
    const [playingSong, setPlayingSong] = useState<string | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const handlePlayPause = (previewUrl: string, title: string) => {
        if (audio) {
            audio.pause();
        }

        if (playingSong === title) {
            setPlayingSong(null);
            return;
        }

        const newAudio = new Audio(previewUrl);
        newAudio.play();
        setAudio(newAudio);
        setPlayingSong(title);
    };

    const handleRemoveSong = (title: string) => {
        removeSong({ title });
    };

    // Ensure audio is stopped when component unmounts
    React.useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    return (
        <Grid container spacing={3}>
            {userData?.favoriteSongs.map((song, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: 220, objectFit: 'cover' }}
                            image={song.albumArtUrl}
                            alt={song.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div" noWrap>
                                {song.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {song.artist}
                            </Typography>
                        </CardContent>
                        <Box textAlign="right" p={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton onClick={() => handlePlayPause(song.previewUrl, song.title)} color="secondary">
                                {playingSong === song.title ? <PauseCircleIcon sx={{ fontSize: 30 }} /> : <PlayCircleIcon sx={{ fontSize: 30 }} />}
                            </IconButton>
                            <IconButton onClick={() => handleRemoveSong(song.title)} color="secondary">
                                <DeleteIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Song;
