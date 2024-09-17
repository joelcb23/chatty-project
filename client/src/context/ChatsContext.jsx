import { useEffect, useState, useContext, createContext } from "react";
import { getChatsRequest } from "../api/chats.api";
import { getUsersRequest } from "../api/users.api";

export const ChatsContext = createContext();

export const useChat = () => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatsProvider");
  }
  return context;
};

export const ChatsContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const loadChats = async () => {
    try {
      const response = await getChatsRequest();
      setChats(response.data.conversations);
    } catch (error) {
      console.error(error);
    }
  };
  const loadUsers = async () => {
    try {
      const response = await getUsersRequest();
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        conversations: chats,
        loadConversations: loadChats,
        users,
        loadUsers,
        // setChats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
