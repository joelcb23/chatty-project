import { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.types";

export const registerChatHandlers = (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  const sendMessage = (content: string) => {
    // Lógica de negocio: Validar mensaje, guardar en DB, etc.
    console.log(`Mensaje de ${socket.id}: ${content}`);

    // Emitir a todos
    io.emit("message", {
      id: Date.now().toString(),
      user: socket.id,
      content,
      timestamp: new Date(),
    });
  };

  // Registrar los listeners
  socket.on("send_message", sendMessage);
};
