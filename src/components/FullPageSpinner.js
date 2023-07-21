import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  opacity: 0.2;
`;

const FullPageSpinner = () => {
  return (
    <MainBox>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </MainBox>
  );
};

export default FullPageSpinner;
