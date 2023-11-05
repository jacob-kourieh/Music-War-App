export interface MatchData {
  gameId: string;
  chosenArtistName: string;
  loserArtistName: string;
}

export interface ArtistData {
  _id: string;
  name: string;
  imgName: string;
}

export interface SongData {
  title: string;
  artist: string;
  albumArtUrl: string;
  previewUrl: string;
}

export interface UserData {
  username: string;
  favoriteSongs: SongData[];
  favoriteArtists: ArtistData[];
  gameData: MatchData[];
}
