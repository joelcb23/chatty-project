import axios from "./axios";

export const getChatsRequest = async () => await axios.get("/chats");

export const getChatByIdRequest = async (id) =>
  await axios.get(`/messages/${id}`);
