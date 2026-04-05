import React from "react";
import { useState } from "react";
import Input from "./Input";
import { IoIosSend } from "react-icons/io";
import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../src/types/socket.types";

const InputButtonChat = ({ className }: { className?: string }) => {
  const [message, setMessage] = useState("");

  // 1. Conexión (Tipada)
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:4000",
    {
      withCredentials: true, // Necesario si usas cookies/sesiones
    },
  );

  // 2. ESCUCHAR (Recepcionista)
  // Este código se ejecuta cada vez que el servidor hace un 'io.emit'
  socket.on("message", (message) => {
    console.log("Nuevo mensaje recibido:", message);
    // Lógica: Aquí añadirías el mensaje al estado de tu lista de mensajes (Array)
    // renderMessage(message);
  });

  // 3. ENVIAR (Emisor)
  const handleSend = (text: string) => {
    if (text.trim().length > 0) {
      // TypeScript aquí solo nos dejará enviar 'send_message' y solo un string
      socket.emit("send_message", text);
      setMessage("");
    }
  };

  // 4. GESTIÓN DE ERRORES
  socket.on("error_notification", (errMsg) => {
    alert("Error del servidor: " + errMsg);
  });

  return (
    <form
      action=""
      className={`flex justify-between items-center gap-2 p-2 ${className}`}
    >
      <input
        type="text"
        className="w-full p-2 rounded-md bg-slate-300 dark:bg-slate-600 focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="button"
        className="p-2 rounded-full bg-blue-500 text-lg hover:bg-blue-600 transition-all duration-300 ease-linear"
        onClick={() => handleSend(message)}
      >
        <IoIosSend />
      </button>
    </form>
  );
};

export default InputButtonChat;
