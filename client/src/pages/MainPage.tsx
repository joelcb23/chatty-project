import ConversationList from "../features/conversations/components/ConversationList";
import ChatView from "../components/ChatView";

const MainPage = () => {
  return (
    <section
      className={`w-full relative flex justify-center items-start gap-2 md:ml-20`}
    >
      {/* Conversations list or User list */}
      <ConversationList className="" data={[]} />
      <ChatView className="" />
    </section>
  );
};

export default MainPage;
