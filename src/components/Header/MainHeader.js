import React from "react";
import MobileHeader from "./MobileHeader";
import PCTabletHeader from "./PCTabletHeader";

const MainHeader = () => {
  return (
    <div>
      <MobileHeader />
      <PCTabletHeader />
    </div>
  );
};

export default MainHeader;
