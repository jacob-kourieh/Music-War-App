import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import Battle from './Pages/Battle/Battle';
import ShowInfo from './Pages/Gallery/ShowInfo';
import Play from './Pages/Battle/Play';
import Gallery from './Pages/Gallery/Gallery';
import Statistics from './Pages/History-Statistics/Statistics';
import History from './Pages/History-Statistics/History';
import RandomSong from './Pages/Music/RandomSong';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard';
import Footer from './Components/Footer';
import AppContext from './Context/AppContext';
import { Artist } from './Types/gameTypes';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
});

function App() {
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleClose = () => {
    setSelectedArtist(null);
  };

  const providerValue = useMemo(() => ({
    winnerId,
    setWinnerId,
    selectedArtist,
    setSelectedArtist,
    handleClose
  }), [winnerId, selectedArtist]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={providerValue}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/show" element={<ShowInfo />} />
            <Route path="/play" element={<Play />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/history" element={<History />} />
            <Route path="/randomsong" element={<RandomSong />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
