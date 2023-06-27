import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import "animate.css";
import ReactDOM from "react-dom";
const BackdropEle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalEle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40vh;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  border-radius: 0.8rem;

  overflow-x: auto;
  animation: zoomIn 200ms ease-out forwards;

  @media (max-width: 750px) {
    height: 30vh;
    width: 80%;
    top: 47%;
    left: 47%;
    transform: translate(-47%, -50%);
  }
`;
const Backdrop = (props) => {
  return <BackdropEle onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
  return (
    <ModalEle>
      <div>{props.children}</div>
    </ModalEle>
  );
};
const portalEle = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalEle)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEle
      )}
    </Fragment>
  );
};

export default Modal;
