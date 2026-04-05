interface HeadingProps {
  level: typeof levels extends Record<infer K, any> ? K : never;
  children: React.ReactNode;
  className?: string;
}
const levels = {
  1: "text-4xl font-bold",
  2: "text-2xl font-bold",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
};

const Heading = ({ level, children, className = "" }: HeadingProps) => {
  const Tag = `h${level}`;

  return (
    <Tag className={["", levels[level], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
};

export default Heading;
