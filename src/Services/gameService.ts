import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Artist, Match, NewMatch } from "../Types/gameTypes";
import { baseURL } from "../Utils/baseURL";

interface ToggleFavoriteArtistData {
  artistId: string;
  action: "add" | "remove";
}

// Fetch all artists
export const useFetchArtists = () => {
  return useQuery<Artist[], Error>({
    queryKey: ["artists"],
    queryFn: () => axios.get(`${baseURL}/artists`).then((res) => res.data),
  });
};

// Add a new artist
export const useAddNewArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newArtist: Omit<Artist, "_id">) =>
      axios.post(`${baseURL}/artist`, newArtist),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};

// Delete an artist
export const useDeleteArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artistId: string) =>
      axios.delete(`${baseURL}/artist/delete/${artistId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
  });
};

// Fetch two random artists
export const useFetchRandomArtists = () => {
  return useQuery<Artist[], Error>({
    queryKey: ["randomArtists"],
    queryFn: () =>
      axios.get(`${baseURL}/artists/random`).then((res) => res.data),
  });
};

// Update the winner artist
export const useUpdateWinner = () => {
  return useMutation({
    mutationFn: (winner: Artist) =>
      axios.put(`${baseURL}/artists/${winner._id}`, {
        wins: (winner.wins ?? 0) + 1,
        games: (winner.games ?? 0) + 1,
      }),
  });
};

// Update the loser artist
export const useUpdateLoser = () => {
  return useMutation({
    mutationFn: (loser: Artist) =>
      axios.put(`${baseURL}/artists/${loser._id}`, {
        defeats: (loser.defeats ?? 0) + 1,
        games: (loser.games ?? 0) + 1,
      }),
  });
};

// Post a new match
export const usePostMatch = () => {
  return useMutation({
    mutationFn: (newMatch: NewMatch) =>
      axios.post(`${baseURL}/matches`, newMatch),
  });
};

// Fetch artist by ID
export const useFetchArtistById = (artistId: string) => {
  return useQuery<Artist, Error>({
    queryKey: ["artist", artistId],
    queryFn: () =>
      axios.get(`${baseURL}/artist/${artistId}`).then((res) => res.data),
    enabled: !!artistId,
  });
};

// Fetch user profile data
export const useToggleFavoriteArtist = () => {
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: ({ artistId, action }: ToggleFavoriteArtistData) =>
      axios.post(
        `${baseURL}/api/user/profile/toggleFavoriteArtist`,
        { artistId, action },
        { headers: { "auth-token": token } }
      ),
    onError: (error: Error) => {
      console.error("Error toggling favorite artist:", error.message);
    },
  });
};

// Fetch matches
export const useFetchMatches = () => {
  return useQuery<Match[], Error>({
    queryKey: ["matches"],
    queryFn: () => axios.get(`${baseURL}/matches`).then((res) => res.data),
  });
};

// Delete a match
export const useDeleteMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (matchId: string) =>
      axios.delete(`${baseURL}/matches/delete/${matchId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
};

// Fetch winners and losers statistics
export const useFetchWinners = () => {
  return useQuery<Artist[], Error>({
    queryKey: ["winners"],
    queryFn: () =>
      axios.get(`${baseURL}/artists/winners`).then((res) => res.data),
  });
};

export const useFetchLosers = () => {
  return useQuery<Artist[], Error>({
    queryKey: ["losers"],
    queryFn: () =>
      axios.get(`${baseURL}/artists/losers`).then((res) => res.data),
  });
};
