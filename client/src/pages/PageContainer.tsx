import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="page-container">{children}</main>;
};

export default PageContainer;
