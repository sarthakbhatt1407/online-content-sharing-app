import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import login from "../assets/images/login.png";
import "animate.css";
import { useDispatch } from "react-redux";
import BtnLoader from "../components/BtnLoader";
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
  animation: fadeIn 2s;
  padding: 1rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  position: absolute;
  top: 45%;
  left: 50%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #a5a5a5;
  transform: translate(-47%, -50%);
  @media (max-width: 750px) {
    left: 47%;
    height: 50vh;
    padding: 2rem 3rem;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }
  h2 {
    font-size: 1.6rem;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  h4 {
    text-align: center;
    margin-top: -1rem;
    font-size: 0.8rem;
    @media (max-width: 750px) {
    }
  }
  a {
    text-decoration: none;
    p {
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.1rem;
      font-size: 1rem;
      @media (max-width: 750px) {
        letter-spacing: 0.09rem;
      }
    }
  }
  button {
  }
`;
const Input = styled.input`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
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
const LoginBtn = styled.button`
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

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState("");
  const [sendingReq, setSendingReq] = useState(false);
  const defaultFields = {
    email: "",
    password: "",
  };

  const [inpFields, setInputFields] = useState(defaultFields);
  const onChangeHandler = (e) => {
    const email = document.getElementById("email");
    email.style.border = "none";
    const password = document.getElementById("password");
    password.style.border = "none";
    setErr(false);
    setErrText("");
    const val = e.target.value;
    const id = e.target.id;
    const obj = {
      ...inpFields,
      [id]: val,
    };
    setInputFields(obj);
  };

  const onClickHandler = async () => {
    setSendingReq(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...inpFields }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      dispatch({ type: "login", data: { ...data } });
      setInputFields(defaultFields);
      setSendingReq(false);
      navigate("/");
    }
    if (!res.ok) {
      if (data.message === "Invalid Email") {
        const email = document.getElementById("email");
        email.style.border = " 1px solid red";
      }
      if (data.message === "Invalid Credentials") {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        email.style.border = " 1px solid red";
        password.style.border = " 1px solid red";
      }
      setErr(true);
      setErrText(data.message);
      setSendingReq(false);
      setInputFields(defaultFields);
    }
  };
  return (
    <OuterBox img={login}>
      <LoginBox>
        <h2>Welcome Back</h2>
        <FormBox>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            onChange={onChangeHandler}
            value={inpFields.email}
          />{" "}
          <Input
            type="password"
            placeholder="Password"
            id="password"
            onChange={onChangeHandler}
            value={inpFields.password}
          />
          {!err && (
            <LoginBtn onClick={onClickHandler}>
              {sendingReq && <BtnLoader />}
              {!sendingReq && "Login"}
            </LoginBtn>
          )}
          {err && <ErrorBtn>{errText}</ErrorBtn>}
          <Link to="/register">
            <p>New User? Register Now</p>
          </Link>
          <h4>
            <Link to="/forgot-password">Forgot Password ?</Link>
          </h4>
        </FormBox>
      </LoginBox>
    </OuterBox>
  );
};

export default LoginPage;
