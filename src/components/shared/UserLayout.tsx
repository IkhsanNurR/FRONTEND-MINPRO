import React, { PropsWithChildren } from "react";
import Header from "./header";

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="p-10">{children}</main>
    </>
  );
};

export default UserLayout;
