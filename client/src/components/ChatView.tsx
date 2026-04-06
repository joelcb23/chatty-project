import React, { useState } from "react";
import InputButtonChat from "./InputButtonChat";
import MessagesContainer from "../features/messages/components/MessagesContainer";
import { useChat } from "../features/messages/hooks/useChat";

const ChatView = ({ className }: { className?: string }) => {
  const { messages, isConnected, sendMessage } = useChat();
  const [text, setText] = useState("");
  const handleSend = () => {
    if (text.trim().length > 0) {
      sendMessage(text);
      setText("");
    }
  };
  // console.log(messages);
  return (
    <div
      className={`w-full fixed md:w-2/3 md:static h-[calc(100vh-125px)] md:h-[calc(100vh-80px)] bg-slate-700 flex flex-col rounded-lg ${className}`}
    >
      <MessagesContainer messages={messages} />
      <InputButtonChat
        className={``}
        onSubmit={handleSend}
        setText={setText}
        text={text}
      />
    </div>
  );
};

export default ChatView;
