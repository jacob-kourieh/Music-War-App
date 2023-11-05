import { useEffect, useState } from 'react';
import { useFetchArtistById, useToggleFavoriteArtist } from '../../Services/gameService';
import { Card, CardMedia, CardContent, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


interface ShowWinnerProps {
    artistId: string;
    closeOverlay: () => void;
}

const ShowWinner: React.FC<ShowWinnerProps> = ({ artistId, closeOverlay }) => {
    const { data: artistData, isLoading: isArtistLoading, error: artistError } = useFetchArtistById(artistId);
    const toggleFavorite = useToggleFavoriteArtist();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(artistData?.isFavorite ?? false);
    }, [artistData]);

    const handleFavoriteClick = () => {
        if (artistData && artistData._id) {
            setIsFavorite(!isFavorite);
            toggleFavorite.mutate({
                artistId: artistData._id,
                action: isFavorite ? 'remove' : 'add'
            });
        }
    };


    if (isArtistLoading) {
        return <CircularProgress />;
    }

    if (artistError) {
        return <Typography color="error">An error occurred: {artistError.message}</Typography>;
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={artistData?.imgName}
                alt={artistData?.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {artistData?.name}
                </Typography>
                <IconButton onClick={handleFavoriteClick} color={isFavorite ? "secondary" : "default"}>
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    Games: {artistData?.games} Wins: {artistData?.wins} Defeats: {artistData?.defeats}
                </Typography>
                <Button variant="outlined" onClick={closeOverlay}>New Game</Button>
            </CardContent>
        </Card>
    );
};

export default ShowWinner;
