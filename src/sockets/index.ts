import { Server } from "socket.io";
import { registerChatHandlers } from "./handlers/chat.handler";
import * as AuthService from "../services/auth.service";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socket.types";

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

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Token not found"));
    }

    try {
      const payload = AuthService.verifyAccessToken(token);
      socket.data.userId = payload.userId;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
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
