import React from "react";
import InputButtonChat from "./InputButtonChat";
import MessagesContainer from "../features/messages/components/MessagesContainer";

const ChatView = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full fixed md:w-2/3 md:static h-[calc(100vh-125px)] md:h-[calc(100vh-80px)] bg-slate-700 flex flex-col rounded-lg ${className}`}
    >
      <MessagesContainer />
      <InputButtonChat className={``} />
    </div>
  );
};

export default ChatView;
