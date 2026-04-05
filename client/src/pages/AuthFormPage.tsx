import React from "react";

const AuthFormPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-slate-300 dark:bg-slate-700 w-full h-full md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-10 px-5 py-10 mb-14 md:mb-auto md:px-16 md:py-20 rounded-lg">
      {children}
    </section>
  );
};

export default AuthFormPage;
