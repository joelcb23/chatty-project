import React from "react";
import Item from "./Item";

const ConversationList = ({
  className,
  data,
}: {
  className?: string;
  data: any;
}) => {
  const conversations = [
    {
      id: 1,
      name: "Chat 1",
      lastMessage: {
        content: "Hello",
        createdAt: "2021-01-01T00:02:00.000Z",
      },
    },
    {
      id: 2,
      name: "Chat 2",
      lastMessage: {
        content: "Hello",
        createdAt: "2021-01-01T00:02:00.000Z",
      },
    },
  ];

  return (
    <div
      className={`w-full absolute left-[-100%] z-50 h-[calc(100vh-125px)] md:static md:w-1/3 md:h-auto md:max-w-[calc(100%-125px)] overflow-y-scroll flex flex-col gap-1 border-y border-slate-500 bg-slate-900 ${className}`}
    >
      {conversations.map((item: any) => (
        <Item key={item.id} name={item.name} lastMessage={item.lastMessage} />
      ))}
    </div>
  );
};

export default ConversationList;
