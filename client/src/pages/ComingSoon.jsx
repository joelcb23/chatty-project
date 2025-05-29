import warningSignal from "../assets/warning-signal.png";
const ComingSoon = () => {
  return (
    <div className="w-full md:w-2/3 mx-auto">
      <h1 className="text-5xl font-bold text-center mt-10">Coming Soon!</h1>
      <p className="text-center text-xl mt-5">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <p className="text-center mt-10">
        <img
          src={warningSignal}
          alt="Coming Soon"
          className="mx-auto md:w-1/4"
        />
      </p>
    </div>
  );
};

export default ComingSoon;
