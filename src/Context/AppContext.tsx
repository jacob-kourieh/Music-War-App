import { createContext } from 'react';
import { Artist } from '../Types/gameTypes';

interface AppContextState {
    winnerId: string | null;
    setWinnerId: (id: string | null) => void;
    selectedArtist: Artist | null;
    setSelectedArtist: (artist: Artist | null) => void;
    handleClose: () => void;
}

const initialContextState: AppContextState = {
    winnerId: null,
    setWinnerId: () => { },
    selectedArtist: null,
    setSelectedArtist: () => { },
    handleClose: () => { },
};

const AppContext = createContext<AppContextState>(initialContextState);

export default AppContext;
