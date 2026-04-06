import Message from "./Message";

const MessagesContainer = ({ messages }: { messages: any }) => {
  return (
    <div className="h-full flex flex-col items-start gap-2 p-2 overflow-y-scroll scroll-smooth">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          data={msg}
          color={msg.senderId === me ? "slate" : "blue"}
          className={msg.senderId === me ? " ml-auto items-end" : "items-start"}
        />
      ))}
    </div>
  );
};

export default MessagesContainer;
