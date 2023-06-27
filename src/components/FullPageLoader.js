import React from "react";
import styled from "styled-components";
const MainBox = styled.div``;
const FullPageLoader = () => {
  return (
    <MainBox>
      <div class="PageLoader">
        <div class="wrapper">
          <div class="circle"></div>
          <div class="line-1"></div>
          <div class="line-2"></div>
          <div class="line-3"></div>
          <div class="line-4"></div>
        </div>
      </div>
    </MainBox>
  );
};

export default FullPageLoader;
