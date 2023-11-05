export interface Genre {
  id: string;
  name: string;
}

export interface Song {
  song: string;
  artist: string;
  albumArtUrl: string;
  previewUrl: string;
  username?: string;
}

export interface User {
  favoriteSongs: Song[];
}
