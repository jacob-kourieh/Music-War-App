import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  ErrorResponse,
} from "../Types/authTypes";
import { baseURL } from "../Utils/baseURL";

// Sign up a new user
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, ErrorResponse, SignUpRequest>({
    mutationKey: ["signUp"],
    mutationFn: async (signUpData) => {
      const { data } = await axios.post<AuthResponse>(
        `${baseURL}/api/user/register`,
        signUpData
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      console.error("SignUp Error:", error);
    },
  });
};

// Sign in an existing user
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, ErrorResponse, SignInRequest>({
    mutationKey: ["signIn"],
    mutationFn: async (signInData) => {
      const { data } = await axios.post<AuthResponse>(
        `${baseURL}/api/user/login`,
        signInData
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      console.error("SignIn Error:", error);
    },
  });
};
