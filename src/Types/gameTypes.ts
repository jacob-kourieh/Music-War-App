export interface Artist {
  _id?: string;
  name: string;
  imgName: string;
  wins?: number;
  games?: number;
  defeats?: number;
  nationality: string;
  genres: string;
  age?: number;
  isFavorite?: boolean;
}

export interface Match {
  _id: string;
  winner: string;
  loser: string;
}

export interface NewMatch {
  winner: string;
  loser: string;
}
