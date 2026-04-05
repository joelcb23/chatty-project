// src/types/socket.types.ts

// 1. Eventos que el Servidor ENVÍA al Cliente (Server -> Client)
export interface ServerToClientEvents {
  // Cuando alguien envía un mensaje y el servidor lo reparte
  message: (data: {
    id: string;
    user: string;
    content: string;
    timestamp: Date;
  }) => void;

  // Para notificar que un usuario entró o salió
  user_status_changed: (data: {
    userId: string;
    status: "online" | "offline";
  }) => void;

  // Para errores específicos del socket
  error_notification: (message: string) => void;
}

// 2. Eventos que el Cliente ENVÍA al Servidor (Client -> Server)
export interface ClientToServerEvents {
  // El cliente solo envía el contenido, el servidor pondrá el resto (ID, fecha)
  send_message: (content: string) => void;

  // Para unirse a una sala específica (ej. un chat grupal o privado)
  join_room: (roomId: string) => void;
}

// 3. Datos que se guardan en el "Mapa" interno del Socket (Opcional pero útil)
export interface SocketData {
  userId: string;
  username: string;
}
