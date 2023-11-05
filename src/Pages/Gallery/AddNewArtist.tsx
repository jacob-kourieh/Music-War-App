import React, { useContext, useState } from 'react';
import FileBase64 from 'react-file-base64';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { useAddNewArtist } from '../../Services/gameService';
import AppContext from '../../Context/AppContext';


const AddNewArtist: React.FC = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [imgName, setImgName] = useState('');
    const [nationality, setNationality] = useState('');
    const [genres, setGenres] = useState('');

    const [clickedField, setClickedField] = useState(false);
    const [ageClicked, setAgeClicked] = useState(false);
    const [nationClicked, setNationClicked] = useState(false);
    const [genresClicked, setGenresClicked] = useState(false);

    const isValidName = (name: string) => name.length >= 2;
    const isValidAge = (age: string) => !isNaN(Number(age)) && Number(age) > 0 && !age.includes(',');
    const isValidNation = (nation: string) => nation.length >= 2;
    const isValidGenres = (genre: string) => genre.length >= 2;

    const nameIsValid = isValidName(name);
    const ageIsValid = isValidAge(age);
    const nationIsValid = isValidNation(nationality);
    const genresIsValid = isValidGenres(genres);
    const formIsValid = nameIsValid && ageIsValid && nationIsValid && genresIsValid;

    const { handleClose } = useContext(AppContext);
    const { mutateAsync: addArtist, isLoading } = useAddNewArtist();

    const artistsData = {
        name: name.trim(),
        age: parseInt(age),
        imgName: imgName,
        nationality: nationality.trim(),
        genres: genres.trim(),
        games: 0,
        wins: 0,
        defeats: 0,
        isFavorite: false,
    };

    const handleAddNewArtist = async () => {
        if (formIsValid) {
            try {
                await addArtist(artistsData);
                handleClose();
            } catch (error) {
                console.error('Error adding new artist:', error);
            }
        }
    };

    return (
        <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add a New Artist</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setClickedField(true);
                    }}
                    error={!nameIsValid && clickedField}
                    helperText={!nameIsValid && clickedField ? "Name must be at least 2 characters." : ""}
                />
                <TextField
                    label="Age"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                        setAgeClicked(true);
                    }}
                    error={!ageIsValid && ageClicked}
                    helperText={!ageIsValid && ageClicked ? "Age must be a positive number." : ""}
                />
                <TextField
                    label="Nationality"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nationality}
                    onChange={(e) => {
                        setNationality(e.target.value);
                        setNationClicked(true);
                    }}
                    error={!nationIsValid && nationClicked}
                    helperText={!nationIsValid && nationClicked ? "Nationality must be at least 2 characters." : ""}
                />
                <TextField
                    label="Genres"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={genres}
                    onChange={(e) => {
                        setGenres(e.target.value);
                        setGenresClicked(true);
                    }}
                    error={!genresIsValid && genresClicked}
                    helperText={!genresIsValid && genresClicked ? "Genres must be at least 2 characters." : ""}
                />
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={imgName}
                    onChange={(e) => setImgName(e.target.value)}
                />
                <FileBase64
                    multiple={false}
                    onDone={({ base64 }: { base64: string }) => setImgName(base64)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleAddNewArtist}
                    disabled={!formIsValid || isLoading}
                >
                    Add Artist
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default AddNewArtist;
