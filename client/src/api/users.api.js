import axios from "./axios.api";

export const getUsersRequest = async () => await axios.get("/users");
