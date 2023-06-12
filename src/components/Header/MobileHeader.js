import React from "react";
import styled from "styled-components";
const MainBox = styled.div`
  display: none;
  @media (max-width: 670px) {
    display: flex;
  }
`;

const MobileHeader = () => {
  return <MainBox>MobileHeader</MainBox>;
};

export default MobileHeader;
