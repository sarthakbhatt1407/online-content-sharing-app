import React from "react";
import styled from "styled-components";
const MainBox = styled.div``;
const FullPageLoader = () => {
  return (
    <MainBox>
      <div className="PageLoader">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>
      </div>
    </MainBox>
  );
};

export default FullPageLoader;
