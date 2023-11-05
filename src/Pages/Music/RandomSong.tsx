import React, { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Button,
} from '@mui/material';
import MusicPlayerSlider from './MusicPlayerSlider';
import * as apiService from '../../Services/musicService';

interface SongInfo {
    song: string;
    artist: string;
    albumArtUrl: string;
    previewUrl: string;
}

function RandomSong() {
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [songInfo, setSongInfo] = useState<SongInfo | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(30);
    const [showPlayer, setShowPlayer] = useState(false);

    const { data: genres, isLoading: isLoadingGenres } = apiService.useFetchGenres();
    const { data: randomSong, isLoading: isLoadingRandomSong } = apiService.useFetchRandomSong(selectedGenre);
    const { data: isFavorite, isLoading: isLoadingFavoriteCheck } = apiService.useCheckIfFavorite(songInfo);
    const addFavoriteMutation = apiService.useAddFavoriteSong();
    const removeFavoriteMutation = apiService.useRemoveFavoriteSong();

    useEffect(() => {
        if (randomSong) {
            setSongInfo({
                song: randomSong.song,
                artist: randomSong.artist,
                albumArtUrl: randomSong.albumArtUrl,
                previewUrl: randomSong.previewUrl,
            });
            const newAudio = new Audio(randomSong.previewUrl);
            setAudio(newAudio);
            setShowPlayer(true);
            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
        }
    }, [randomSong]);

    useEffect(() => {
        if (audio) {
            const updatePosition = () => {
                setPosition(audio.currentTime);
            };

            const updateDuration = () => {
                setDuration(audio.duration || 0);
            };

            audio.addEventListener('timeupdate', updatePosition);
            audio.addEventListener('loadedmetadata', updateDuration);

            return () => {
                audio.removeEventListener('timeupdate', updatePosition);
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [audio]);

    const handleRandomSongClick = () => {
        if (audio) {
            audio.pause();
        }
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
        setSelectedGenre(selectedGenre); // Trigger the query to refetch
    };

    const handlePlayPauseClick = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        const newVolume = typeof newValue === 'number' ? newValue / 100 : 0;
        if (audio) {
            audio.volume = newVolume;
        }
        setVolume(typeof newValue === 'number' ? newValue : 0);
    };

    const handlePositionChange = (_: Event, newValue: number | number[]) => {
        if (audio) {
            audio.currentTime = typeof newValue === 'number' ? newValue : 0;
            setPosition(typeof newValue === 'number' ? newValue : 0);
        }
    };

    const handleFavoriteClick = () => {
        if (!songInfo) return;

        const username = localStorage.getItem("username");
        if (!username) {
            console.error("User is not logged in");
            return;
        }

        const songData = {
            ...songInfo,
            username,
        };

        if (isFavorite) {
            removeFavoriteMutation.mutate(songData);
        } else {
            addFavoriteMutation.mutate(songData);
        }
    };

    const handleSpotifySearch = () => {
        if (!songInfo) return;

        const searchQuery = encodeURIComponent(`${songInfo.song} ${songInfo.artist}`);
        const searchUrl = `https://open.spotify.com/search/${searchQuery}`;
        window.open(searchUrl, "_blank");
    };

    const handleBackToSelection = () => {
        setShowPlayer(false);
        setSelectedGenre("");
    };

    const formatDuration = (value: number) => {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    };

    const loading = isLoadingGenres || isLoadingRandomSong || isLoadingFavoriteCheck;

    return (
        <Container>
            <Box sx={{ mb: 4, textAlign: "center" }}>
                <article className="gallery-header music-app">
                    <h2 className="gallery-title margin-title">THE MUSIC</h2>
                    <p>Welcome to random song. You can try and choose the genre and then get your song. You can add the song to your favorites by logging in or registering...</p>
                </article>
            </Box>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && !showPlayer && (
                <>
                    <Box sx={{ width: "50%", mx: "auto", mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="genre-select-label">Select a genre</InputLabel>
                            <Select
                                labelId="genre-select-label"
                                id="genre-select"
                                value={selectedGenre}
                                label="Select a genre"
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                {genres?.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {selectedGenre && (
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleRandomSongClick}
                            >
                                Get a random song
                            </Button>
                        </Box>
                    )}
                </>
            )}

            {songInfo && songInfo.previewUrl && showPlayer && (
                <MusicPlayerSlider
                    songInfo={{
                        song: songInfo.song,
                        artist: songInfo.artist,
                        albumArtUrl: songInfo.albumArtUrl,
                        previewUrl: songInfo.previewUrl,
                    }}
                    audio={audio}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    position={position}
                    setPosition={setPosition}
                    duration={duration}
                    setDuration={setDuration}
                    volume={volume}
                    setVolume={setVolume}
                    isFavorite={isFavorite}
                    handleRandomSongClick={handleRandomSongClick}
                    handlePlayPauseClick={handlePlayPauseClick}
                    handleVolumeChange={handleVolumeChange}
                    handlePositionChange={handlePositionChange}
                    formatDuration={formatDuration}
                    handleFavoriteClick={handleFavoriteClick}
                    handleSpotifySearch={handleSpotifySearch}
                    handleBackToSelection={handleBackToSelection}
                />
            )}
        </Container>
    );
}

export default RandomSong;
