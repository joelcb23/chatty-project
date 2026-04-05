import Heading from "../../../components/Heading";
interface ItemProps {
  name: string;
  lastMessage: { content: string; createdAt: string };
  className?: string;
}
const Item = ({ name, lastMessage, className }: ItemProps) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 p-2 cursor-pointer rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 ease-linear ${className}`}
    >
      <Heading level={4}>{name}</Heading>
      <div className={`w-full flex justify-between`}>
        <p className="text-sm text-slate-400">{lastMessage.content}</p>
        <span className="text-xs text-slate-400">
          {lastMessage.createdAt.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default Item;
