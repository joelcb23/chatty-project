import axios from "./axios";

export const registerAuthRequest = async (data) =>
  await axios.post(`/auth/signup`, data);

export const loginAuthRequest = async (data) =>
  await axios.post(`/auth/login`, data);

export const verifyAuthRequest = async () => await axios.get(`/auth/verify`);

export const logoutAuthRequest = async () =>
  await axios.post(`/auth/logout`, {}, { withCredentials: true });
