import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../src/types/socket.types";

class SocketService {
  public socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  connect() {
    this.socket = io(
      import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
      { withCredentials: true },
    );

    this.socket.on("connect", () => {
      console.log("Connected to server with ID: ", this.socket?.id);
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  // Example of sending a message to the server
  sendMessage(content: string) {
    this.socket?.emit("message", content);
  }
}

export const socketService = new SocketService();
