import axios from "./axios";

export const getUsersRequest = async () => await axios.get("/users");
