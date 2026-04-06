// src/types/socket.types.ts

export interface ServerToClientEvents {
  message: (data: {
    id: string;
    user: string;
    content: string;
    timestamp: Date;
  }) => void;

  user_status_changed: (data: {
    userId: string;
    status: "online" | "offline";
  }) => void;

  error_notification: (message: string) => void;
}

export interface ClientToServerEvents {
  message: (content: string) => void;

  join_room: (roomId: string) => void;
}

export interface SocketData {
  userId: string;
  username: string;
}
