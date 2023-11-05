import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Genre, Song, User } from "../Types/musicTypes";
import { baseURL } from "../Utils/baseURL";

//Fetch all genres
export const useFetchGenres = () => {
  return useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await axios.get<Genre[]>(`${baseURL}/api/genres`);
      return data;
    },
  });
};

//Fetch all songs from a genre
export const useFetchRandomSong = (genreId: string) => {
  return useQuery<Song, Error>({
    queryKey: ["randomSong", genreId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseURL}/api/randomsong?genreId=${genreId}`
      );
      return data;
    },
    enabled: !!genreId,
  });
};

//Check if a song is a favorite
export const useCheckIfFavorite = (songInfo: Song | null) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return useQuery<boolean, Error>({
    queryKey: ["checkIfFavorite", songInfo?.song, songInfo?.artist],
    queryFn: async () => {
      if (!songInfo || !username || !token)
        throw new Error("Required information is missing");
      const { data } = await axios.get<User>(
        `${baseURL}/api/user/profile/${username}`,
        {
          headers: { "auth-token": token },
        }
      );
      const favoriteSongs = data.favoriteSongs || [];
      return favoriteSongs.some(
        (song) => song.song === songInfo.song && song.artist === songInfo.artist
      );
    },
    enabled: !!songInfo?.song && !!songInfo?.artist && !!username && !!token,
  });
};

//Add a favorite song
export const useAddFavoriteSong = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, Song>({
    mutationFn: async (songData) => {
      await axios.post(
        `${baseURL}/api/user/profile/addFavoriteSong`,
        songData,
        {
          headers: { "auth-token": token as string },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkIfFavorite"] });
    },
    onError: (error) => {
      console.error("Error adding favorite song:", error);
    },
  });
};

//Remove a favorite song
export const useRemoveFavoriteSong = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, Song>({
    mutationFn: async (songData) => {
      await axios.post(
        `${baseURL}/api/user/profile/removeFavoriteSong`,
        songData,
        {
          headers: { "auth-token": token as string },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkIfFavorite"] });
    },
    onError: (error) => {
      console.error("Error removing favorite song:", error);
    },
  });
};
