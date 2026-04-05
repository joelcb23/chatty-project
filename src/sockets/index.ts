import { Server } from "socket.io";
import { registerChatHandlers } from "./handlers/chat.handler";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "src/types/socket.types";

export const initSockets = (httpServer: any) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    any,
    SocketData
  >(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    connectionStateRecovery: {},
  });

  io.on("connection", async (socket) => {
    console.log("New connection: ", socket.id);

    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
    });
  });
  return io;
};
