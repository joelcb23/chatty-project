import Message from "./Message";

const MessagesContainer = () => {
  const me = 1;
  const date = "2026-03-05T04:32:32.842Z";
  const messages = [
    { id: 1, message: "Hello", senderId: 1, createdAt: date },
    { id: 2, message: "Hi, fff", senderId: 2, createdAt: date },
    { id: 3, message: "Hefadsfas  adfso", senderId: 1, createdAt: date },
    { id: 4, message: "Hasdfsa, fadsfs", senderId: 2, createdAt: date },
    { id: 5, message: "Hello, fa sdf", senderId: 1, createdAt: date },
    { id: 6, message: "Hifadf", senderId: 2, createdAt: date },
    { id: 7, message: "Hello, fasdf", senderId: 1, createdAt: date },
    { id: 8, message: "Hi,fasdfsa dsf", senderId: 2, createdAt: date },
    { id: 9, message: "Hello, fasdf adfas adfa", senderId: 1, createdAt: date },
    { id: 10, message: "Hifd", senderId: 2, createdAt: date },
  ];
  return (
    <div className="h-full flex flex-col items-start gap-2 p-2 overflow-y-scroll scroll-smooth">
      {messages.map((message) => (
        <Message
          key={message.id}
          data={message}
          color={message.senderId === me ? "slate" : "blue"}
          className={
            message.senderId === me ? " ml-auto items-end" : "items-start"
          }
        />
      ))}
    </div>
  );
};

export default MessagesContainer;
