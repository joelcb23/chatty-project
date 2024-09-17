import { IoIosSend } from "react-icons/io";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { IoPersonCircle } from "react-icons/io5";
import { io } from "socket.io-client";
import { useData } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useChat } from "../context/ChatsContext";
import { useEffect, useState, useRef } from "react";
import { getChatByIdRequest } from "../api/chats.api";

const ChatsPage = () => {
  const { user, loading } = useData();
  const { conversations, loadConversations, users, loadUsers } = useChat();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [visibilityUsers, setVisibilityUsers] = useState(false);
  const socketRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      auth: {
        token: Cookies.get("token"),
        user: user.user,
        receiverId,
      },
    });

    socketRef.current.on(
      "message",
      (message, serverOffset, senderId, conversationId) => {
        if (activeConversationId === conversationId) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: serverOffset, message, senderId },
          ]);
        }
      }
    );
    socketRef.current.on("conversation", (id) => {
      console.log(id);
      setActiveConversationId(id);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [user, receiverId]);

  useEffect(() => {
    loadConversations();
    loadUsers();
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLoadMessages = (conversationId) => {
    loadConversations();
    const conversation = conversations.find((c) => c.id === conversationId);
    const participant = conversation.Participants.find(
      ({ userId }) => userId !== user.user.id
    );
    setReceiverId(participant.userId);
    setActiveConversationId(conversationId);
    if (!conversation || !conversation.Messages) {
      setMessages([]);
      return;
    }
    setMessages(conversation.Messages);
  };

  const createConversation = async (id) => {
    setReceiverId(id);
    socketRef.current.emit("conversation", id);
    const response = await getChatByIdRequest(id);
    console.log(response);
    if (!response.data.messages) return;
    setMessages(response.data.messages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target[0].value.trim();
    if (!message) return;
    socketRef.current.emit("message", message);
    event.target[0].value = "";
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), message, senderId: user.user.id },
    ]);
  };

  const renderUsers = () => {
    if (!users) return <div>Loading...</div>;
    return users
      .filter(({ id }) => id !== user.user.id)
      .map(({ id, name }) => (
        <li
          key={id}
          onClick={() => createConversation(id)}
          className={`flex items-center gap-2 py-2 pl-4 cursor-pointer hover:bg-slate-700`}
        >
          <IoPersonCircle className="w-6 h-6" />
          {name}
        </li>
      ));
  };

  const renderConversations = () => {
    if (!conversations) return <div>Loading...</div>;
    return conversations.map(({ id, Participants }) => {
      const otherParticipant = Participants.find(
        ({ userId }) => userId !== user.user.id
      );
      return (
        <li
          key={id}
          onClick={() => handleLoadMessages(id)}
          className={`
            flex items-center gap-2 py-2 pl-4 cursor-pointer hover:bg-slate-700 
            ${activeConversationId === id ? "bg-slate-600" : ""}
          `}
        >
          <IoPersonCircle className="w-6 h-6" />
          {otherParticipant.Users.name}
        </li>
      );
    });
  };

  const renderMessageList = () => {
    if (!messages || messages.length === 0)
      return <div className="w-full my-5 text-center">No messages</div>;
    return messages.map(({ id, message, senderId }) => (
      <li
        key={id}
        className={`
          max-w-[80%] p-2 cursor-pointer  m-2 rounded-md 
          ${
            senderId === user.user.id ? "ml-auto bg-slate-700" : "bg-slate-500"
          } 
        `}
      >
        {message}
      </li>
    ));
  };

  return (
    <div className="w-full md:w-[90%] lg:w-3/4 mx-auto flex items-start gap-3">
      {loading ? (
        <h1 className="text-center font-bold">Loading...</h1>
      ) : (
        <>
          <div className="w-1/2 bg-slate-800 rounded-md">
            <h1 className="font-bold text-lg p-2">Conversations</h1>
            <ul>{renderConversations()}</ul>
            <div className="p-2 flex justify-between items-center text-lg">
              <h1>Users</h1>
              <button
                type="button"
                onClick={() => setVisibilityUsers(!visibilityUsers)}
              >
                {visibilityUsers ? <SlArrowUp /> : <SlArrowDown />}
              </button>
            </div>
            <ul
              className={`${
                visibilityUsers ? "block" : "hidden"
              } transition-all ease-in`}
            >
              {renderUsers()}
            </ul>
          </div>
          <div className="border rounded w-1/2 h-[calc(100vh-100px)] flex flex-col justify-end">
            <ul
              ref={messagesRef}
              className="w-full flex flex-col items-start gap-2 overflow-y-scroll scroll-smooth"
            >
              {renderMessageList()}
            </ul>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 p-4 items-center"
            >
              <input
                type="text"
                className="w-full p-2 rounded-md bg-slate-600 focus:outline-none"
                placeholder="Type your message..."
              />
              <button
                className="bg-blue-500 rounded-full p-2 hover:bg-blue-700"
                type="submit"
              >
                <IoIosSend />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatsPage;
