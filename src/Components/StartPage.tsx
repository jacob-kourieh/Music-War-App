import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoAnimation from './LogoAnimation';
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import { useFetchRandomArtists } from '../Services/gameService';

const StartPage: React.FC = () => {
    const { data: isLoading, isError, error } = useFetchRandomArtists();

    const [fill, setFill] = useState<number>(0);
    let animationFrameId: number | null = null;

    const startLoadingAnimation = () => {
        const startTime = performance.now();

        const animate = (time: number) => {
            const progress = time - startTime;
            const percent = Math.min(progress / 50000, 1);
            setFill(percent * 100);
            if (percent < 1) {
                animationFrameId = window.requestAnimationFrame(animate);
            }
        };

        animationFrameId = window.requestAnimationFrame(animate);
    };

    const stopLoadingAnimation = () => {
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
        }
        setFill(100);
    };

    useEffect(() => {
        startLoadingAnimation();
        return () => {
            stopLoadingAnimation();
        };
    }, []);

    if (isError) {
        console.error('There has been a problem with your fetch operation:', error);
    }

    return (
        <Box className="start-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Link to="/play" style={{ textDecoration: 'none' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" gutterBottom>
                        Music Artist War
                    </Typography>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button variant="contained" color="primary">
                            Start
                        </Button>
                    )}
                    <LogoAnimation fill={fill} />
                </Box>
            </Link>
        </Box>
    );
}

export default StartPage;
