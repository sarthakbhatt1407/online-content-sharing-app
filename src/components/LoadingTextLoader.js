import React from "react";
import styled from "styled-components";
const MainBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const LoadingTextLoader = () => {
  return (
    <MainBox>
      <div className="classic-1"></div>
    </MainBox>
  );
};

export default LoadingTextLoader;
