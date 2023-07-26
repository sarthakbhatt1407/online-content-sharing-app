import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import register from "../assets/images/register.svg";
import "animate.css";
import BtnLoader from "../components/BtnLoader";
import Modal from "../UI/Modal";
import { EnvVariables } from "../data";

const OuterBox = styled.div`
  height: 100vh;
  position: relative;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 750px) {
    background-size: cover;
  }
`;
const LoginBox = styled.div`
  padding: 1rem 4rem;
  animation: fadeIn 2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
  height: 80vh;
  position: absolute;
  top: 45%;
  left: 50%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #a5a5a5;
  transform: translate(-47%, -50%);
  overflow: auto;

  @media (max-width: 750px) {
    left: 47%;
    height: 75vh;
    padding: 2rem 1rem;
    justify-content: center;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }
  h1 {
    font-size: 1.7rem;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  a {
    text-decoration: none;
    p {
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.12rem;
      font-size: 1rem;
      @media (max-width: 750px) {
        letter-spacing: 0.09rem;
      }
    }
  }
`;
const Input = styled.input`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
`;
const ImgDiv = styled.div`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
  height: 4rem;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const FileInput = styled.input`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
`;

const ProfileImg = styled.img`
  width: 1rem;
`;
const ErrorBtn = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  border: none;
  padding: 0.4rem 1rem;
  background-color: #d2d2d2;
  color: #909090;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  border-radius: 2rem;
  font-weight: 600;
  animation: 0.2s ease 0s 1 normal none running fadeIn;
`;
const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  padding: 0.5rem 1rem;
  background-color: #4b74d9;
  color: white;
  font-size: 1.1rem;
  letter-spacing: 0.16rem;
  border-radius: 2rem;
  font-weight: 600;
  animation: fadeIn 0.2s;
`;
const ModalDiv = styled.div`
  /* background-color: red; */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 20vh;
  padding: 2rem 0;
  gap: 2rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
    gap: 1rem;
  }
  button {
    display: flex;
    justify-content: center;
    border: none;
    padding: 0.5rem 1rem;
    background-color: #4b74d9;
    color: white;
    font-size: 1.1rem;
    letter-spacing: 0.16rem;
    border-radius: 2rem;
    font-weight: 600;
    animation: fadeIn 0.2s;
  }
`;
const ModalPara = styled.p`
  color: black;
  font-size: 1.6rem;
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`;

const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const defaultFields = {
    name: "",
    email: "",
    password: "",
    friends: [],
    chats: [],
    likedPost: [],
    pendingRequest: [],
    image: "",
  };
  const [inpFields, setInputFields] = useState(defaultFields);
  const [img, setImg] = useState("");
  const [errText, setErrText] = useState("");
  const imageOnChangeHandler = (e) => {
    if (e.target.files[0]) {
      setErr(false);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      setInputFields({ ...inpFields, image: e.target.files[0] });
      reader.onload = () => {
        setImg(reader.result);
      };
    } else {
      setImg(img);
    }
  };
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const onChangeHandler = (e) => {
    setErr(false);
    const val = e.target.value;
    const id = e.target.id;
    const ele = document.getElementById(id);
    ele.style.border = "none";
    const obj = {
      ...inpFields,
      [id]: val,
    };
    setInputFields(obj);
  };
  const onClickHandler = async () => {
    setBtnLoader(true);
    const { name, email, password, image } = inpFields;
    if (name.length > 1 && email && image && password.length > 5) {
      const form = new FormData();
      form.append("name", inpFields.name);
      form.append("email", inpFields.email);
      form.append("password", inpFields.password);
      form.append("friends", inpFields.friends);
      form.append("chats", inpFields.chats);
      form.append("likedPost", inpFields.likedPost);
      form.append("pendingRequest", inpFields.pendingRequest);
      form.append("image", inpFields.image);
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/signup`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setErr(true);
        setErrText(data.message);
        setBtnLoader(false);
      } else {
        setShowModal(true);
        setInputFields(defaultFields);
      }
    } else {
      if (name.length < 2) {
        const name = document.getElementById("name");
        name.style.border = "1px solid red";
        setErr(true);
        setErrText("Invalid Name");
        setBtnLoader(false);
        return;
      }
      if (email.length < 5) {
        const email = document.getElementById("email");
        email.style.border = "1px solid red";
        setErrText("Invalid Email");
        setBtnLoader(false);
        setErr(true);
        return;
      }
      if (password.length < 6) {
        const password = document.getElementById("password");
        password.style.border = "1px solid red";
        setErrText("Password is too short ");
        setBtnLoader(false);
        setErr(true);
        return;
      }
      if (!image) {
        const image = document.getElementById("image");
        image.style.border = "1px solid red";
        setErrText("Please Select Image");
        setBtnLoader(false);
        setErr(true);
        setBtnLoader(false);
        return;
      }
    }
    setBtnLoader(false);
    // setInputFields(defaultFields);
  };
  const history = useNavigate();
  const goTOLogin = () => {
    history("/login");
  };
  return (
    <OuterBox img={register}>
      <LoginBox>
        {showModal && (
          <Modal onClick={showModalHandler}>
            <ModalDiv>
              <ModalPara>SignUp Successful. Kindly Login</ModalPara>
              <button onClick={goTOLogin}>Login</button>
            </ModalDiv>
          </Modal>
        )}
        <h1>Register</h1>
        <FormBox>
          <Input
            type="name"
            placeholder="Enter Name"
            id="name"
            onChange={onChangeHandler}
            value={inpFields.name}
          />
          <Input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            onChange={onChangeHandler}
            value={inpFields.email}
          />
          <FileInput
            type="file"
            accept="image/*"
            id="image"
            onChange={imageOnChangeHandler}
          />
          {img && <ImgDiv image={img}></ImgDiv>}

          <Input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={onChangeHandler}
            value={inpFields.password}
          />
          {!err && !btnLoader && (
            <RegisterBtn onClick={onClickHandler}>
              {!btnLoader && "Register"}
            </RegisterBtn>
          )}
          {!err && btnLoader && (
            <RegisterBtn disabled>{btnLoader && <BtnLoader />}</RegisterBtn>
          )}
          {err && <ErrorBtn>{errText}</ErrorBtn>}
          <Link to="/login">
            <p>Existing User? Login Now</p>
          </Link>
        </FormBox>
      </LoginBox>
    </OuterBox>
  );
};

export default RegisterPage;
