import React from "react";
import Item from "./Item";
import { useConversations } from "../hooks/useConversations";

const ConversationList = ({ className }: { className?: string }) => {
  const { conversations } = useConversations();
  // console.log(conversations);

  return (
    <div
      className={`w-full absolute left-[-100%] z-50 h-[calc(100vh-125px)] md:static md:w-1/3 md:h-auto md:max-w-[calc(100%-125px)] overflow-y-scroll flex flex-col gap-1 border-y border-slate-500 bg-slate-900 ${className}`}
    >
      {conversations.map((item: any) => (
        <Item
          key={item.id}
          name={item.isGroup ? item.title : item.members[1].user.username}
        />
      ))}
    </div>
  );
};

export default ConversationList;
