import React, { useState } from "react";
import Artists from "./Artists";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Box, Container } from "@mui/material";
import AddNewArtist from "./AddNewArtist";

const Gallery: React.FC = () => {
    const [showOverlayItem, setShowOverlayItem] = useState<boolean>(false);


    return (
        <Container>
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gallery
                </Typography>
                <Typography paragraph>
                    In the gallery, you can see all artists participating in the game and
                    can click on artists' pictures to see more information about them. You
                    can also use the search function to search for artist name, artist
                    nationality, or artist genres.
                </Typography>
                <Box sx={{ '& > button': { m: 1 } }}>
                    <Button variant="contained" onClick={() => setShowOverlayItem(true)}>
                        Add artist
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/play"
                    >
                        Play Again
                    </Button>
                </Box>
            </Box>
            <Box>
                <Artists />
                {showOverlayItem && <AddNewArtist />}
            </Box>
        </Container>
    );
};

export default Gallery;
