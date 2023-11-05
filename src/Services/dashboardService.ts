import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArtistData, SongData, UserData } from "../Types/dashboardTypes";
import { baseURL } from "../Utils/baseURL";

// Fetch user profile data
export const useFetchUserData = (username: string | null) => {
  const token = localStorage.getItem("token");
  return useQuery<UserData, Error>({
    queryKey: ["userData", username],
    queryFn: async () => {
      if (!username || !token) throw new Error("Authentication required");
      const { data } = await axios.get<UserData>(
        `${baseURL}/api/user/profile/${username}`,
        {
          headers: { "auth-token": token },
        }
      );
      return data;
    },
    enabled: !!username && !!token,
  });
};

// Add a favorite song
export const useAddFavoriteSong = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, SongData>({
    mutationFn: async (songData) => {
      if (!token) throw new Error("Authentication required");
      await axios.post(
        `${baseURL}/api/user/profile/addFavoriteSong`,
        songData,
        {
          headers: { "auth-token": token },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

// Remove a favorite song
export const useRemoveFavoriteSong = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, { title: string }>({
    mutationFn: async ({ title }) => {
      const username = localStorage.getItem("username");
      if (!token || !username) throw new Error("Authentication required");
      await axios.post(
        `${baseURL}/api/user/profile/removeFavoriteSong`,
        { username, title },
        {
          headers: { "auth-token": token },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

// Add a favorite artist
export const useAddFavoriteArtist = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, ArtistData>({
    mutationFn: async (artistData) => {
      if (!token) throw new Error("Authentication required");
      await axios.post(
        `${baseURL}/api/user/profile/addFavoriteArtist`,
        artistData,
        {
          headers: { "auth-token": token },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

// Remove a favorite artist
export const useRemoveFavoriteArtist = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, { artistId: string }>({
    mutationFn: async ({ artistId }) => {
      const username = localStorage.getItem("username");
      if (!token || !username) throw new Error("Authentication required");
      await axios.post(
        `${baseURL}/api/user/profile/removeFavoriteArtist`,
        { username, artistId },
        {
          headers: { "auth-token": token },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

// Delete a match
export const useDeleteMatch = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, Error, { gameId: string }>({
    mutationFn: async ({ gameId }) => {
      const username = localStorage.getItem("username");
      if (!token || !username) throw new Error("Authentication required");
      await axios.post(
        `${baseURL}/api/user/profile/deleteMatch`,
        { username, gameId },
        {
          headers: { "auth-token": token },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};
