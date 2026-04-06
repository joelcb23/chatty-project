import { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../types/socket.types";

export const registerChatHandlers = (
  io: Server<ClientToServerEvents, ServerToClientEvents, any, SocketData>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, any, SocketData>,
) => {
  const sendMessage = async (content: string) => {
    console.log("Received message:", content, "from user:", socket.data.userId);
    io.emit("message", {
      id: Date.now().toString(),
      user: socket.data.userId,
      content,
      timestamp: new Date(),
    });
  };

  socket.on("message", sendMessage);
};
