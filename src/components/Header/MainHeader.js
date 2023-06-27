import React from "react";
import MobileHeader from "./MobileHeader";
import PCTabletHeader from "./PCTabletHeader";
import styled from "styled-components";
const MainBox = styled.div`
  background-color: white;
`;

const MainHeader = () => {
  return (
    <MainBox>
      <MobileHeader />
      <PCTabletHeader />
    </MainBox>
  );
};

export default MainHeader;
