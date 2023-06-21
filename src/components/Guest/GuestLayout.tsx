import React, { PropsWithChildren, useEffect, useState } from "react";
import Topbar2 from "../shared/topbar2";

const GuestLayout = ({ children }: any) => {
  return (
    <>
      <Topbar2 />
      <main
        className={`pt-16`}
      >
        <div className="px-4 md:px-12 bg-white">{children}</div>
      </main>
    </>
  );
};

export default GuestLayout;
