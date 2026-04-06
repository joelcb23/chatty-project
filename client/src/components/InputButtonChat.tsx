import React from "react";
import { IoIosSend } from "react-icons/io";

const InputButtonChat = ({
  className,
  onSubmit,
  text,
  setText,
}: {
  className?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: () => void;
}) => {
  const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };
  return (
    <form
      onSubmit={onSubmitWrapper}
      className={`flex justify-between items-center gap-2 p-2 ${className}`}
    >
      <input
        type="text"
        className="w-full p-2 rounded-md bg-slate-300 dark:bg-slate-600 focus:outline-none"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-blue-500 text-lg hover:bg-blue-600 transition-all duration-300 ease-linear"
      >
        <IoIosSend />
      </button>
    </form>
  );
};

export default InputButtonChat;
