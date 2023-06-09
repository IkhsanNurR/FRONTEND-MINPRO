import React, { PropsWithChildren } from "react";

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <h1>TOpbar</h1>
      {children}
    </>
  );
};

export default UserLayout;
