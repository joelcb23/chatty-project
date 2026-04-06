const Message = ({
  color,
  className,
  data,
}: {
  color: string;
  className?: string;
  data: any;
}) => {
  return (
    <div className={`max-w-[60%] flex flex-col gap-2 ${className}`}>
      <p className={`bg-${color}-500  p-2 rounded-lg`}>{data.message}</p>
      <span className="text-xs text-slate-400">
        {data.createdAt.slice(11, 16)}
        {/* {console.log(data.createdAt.slice(0, 10))} */}
      </span>
    </div>
  );
};

export default Message;
