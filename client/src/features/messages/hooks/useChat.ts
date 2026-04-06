import { useEffect, useState } from "react";
import { socketService } from "../../../services/socket.service";
import type { ServerToClientEvents } from "../../../../../src/types/socket.types";

type Message = Parameters<ServerToClientEvents["message"]>[0];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socketService.socket?.on("connect", onConnect);
    socketService.socket?.on("disconnect", onDisconnect);
    socketService.socket?.on("message", onMessage);

    return () => {
      socketService.socket?.off("connect", onConnect);
      socketService.socket?.off("disconnect", onDisconnect);
      socketService.socket?.off("message", onMessage);
      socketService.disconnect();
    };
  }, []);

  const sendMessage = (content: string) => {
    socketService.sendMessage(content);
  };

  return { messages, isConnected, sendMessage };
};
