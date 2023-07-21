import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "../components/Profile Page/ProfileInfo";
import { useParams } from "react-router-dom";
import { EnvVariables } from "../data";
import styled from "styled-components";
import FullPageLoader from "../components/FullPageLoader";
import UserFreindsAndPost from "../components/Profile Page/UserFreindsAndPost";
import BtnLoader from "../components/BtnLoader";
import "animate.css";
import Modal from "../UI/Modal";
import SettingPasswordReset from "../components/SettingPasswordReset";
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProfileInfoBox = styled.div`
  background-color: white;
  padding: 0 10rem;
  @media (max-width: 750px) {
    padding: 0;
  }
`;
const NavigatorSettingsDiv = styled.div`
  display: flex;
  /* background-color: green; */
  justify-content: center;
  padding: 1rem 0;
  gap: 1rem;
  @media (max-width: 750px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NavigatorTab = styled.div`
  background-color: white;
  width: 24%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  font-size: 1.3rem;
  letter-spacing: 0.09rem;
  color: #585858;
  font-weight: 350;
  border-radius: 0.5rem;
  height: 20vh;
  justify-content: center;
  div {
    padding: 0.2rem 1rem;
    cursor: pointer;
  }
  @media (max-width: 750px) {
    flex-direction: row;
    width: 91%;
    font-size: 1.1rem;
    height: auto;
    margin-top: -1.5rem;
    gap: 0rem;
    justify-content: space-evenly;
    div {
      padding: 0.1rem 0.5rem;
    }
  }
`;
const SettingsTab = styled.div`
  background-color: white;
  width: 70%;
  border-radius: 0.5rem;
  height: 45vh;
  overflow: scroll;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 750px) {
    width: 100%;
    height: auto;
    max-height: 55vh;
  }
`;
const ProfileSettingMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s;
  button {
    margin-top: 1.1rem;
    @media (max-width: 750px) {
      margin-top: 1.5rem;
    }
  }
  @media (max-width: 750px) {
  }
`;
const HeadingDiv = styled.div`
  color: #a8a8a8;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 1.2rem;
  letter-spacing: 0.09rem;
`;

const LabelDiv = styled.div`
  width: 70%;
  text-align: start;
  span {
    color: #b9b9b9;
    letter-spacing: 0.09rem;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 60%;
  align-items: center;

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
  @media (max-width: 750px) {
    width: 100%;
  }
`;
const Input = styled.input`
  padding: 0.6rem 2rem 0.6rem 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  width: 60%;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
  @media (max-width: 750px) {
  }
`;
const ImgDiv = styled.div`
  padding: 0.6rem 2rem 0.6rem 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
  height: 4rem;
  width: 60%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const FileInput = styled.input`
  width: 60%;
  padding: 0.6rem 2rem 0.6rem 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
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
const ModalDiv = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  h3 {
    color: black;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    font-weight: 350;
  }
  button {
    border: none;
    background-color: #1b74e4;
    color: white;
    padding: 0.7rem 1rem;
    border-radius: 0.7rem;
    font-size: 1rem;
  }
  @media (max-width: 750px) {
    height: 30vh;
  }
`;

const SecuritySettingMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 50vh;
  @media (max-width: 750px) {
    height: 30vh;
  }
`;

const AccountSetting = () => {
  const dispatch = useDispatch();
  const userId = useParams().id;
  const myUserId = useSelector((state) => state.userId);
  const [userData, setUserData] = useState(null);
  const [profileActive, setProfileActive] = useState(true);
  const [securityActive, setSecurityActive] = useState(false);

  const id = useSelector((state) => state.userId);
  useEffect(() => {
    const userDataLocal = JSON.parse(localStorage.getItem("userData"));
    if (userDataLocal) {
      dispatch({ type: "login", data: { ...userDataLocal } });
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        dispatch({ type: "login", data: { ...userData } });
      }
      const fetcher = async () => {
        const userResAtStart = await fetch(
          `${EnvVariables.BASE_URL}/api/user/${id}`
        );
        const userResDataAtStart = await userResAtStart.json();
        if (!userResAtStart.ok) {
          dispatch({ type: "logout" });
          window.location.reload();
        }
        const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUserData(data);
        }
      };
      fetcher();
    }
  }, []);
  const [errText, setErrText] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [err, setErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const defaultFields = {
    name: "",
    image: "",
  };
  const [img, setImg] = useState("");
  const [inpFields, setInputFields] = useState(defaultFields);
  const [doneTxt, setDoneTxt] = useState("");

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

  const imageOnChangeHandler = (e) => {
    if (e.target.files[0]) {
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
  const onClickHandler = async () => {
    setBtnLoader(true);
    const nameInp = document.querySelector("#name");
    const imageInp = document.querySelector("#image");
    nameInp.value = "";
    imageInp.value = "";
    const { name, image } = inpFields;
    if (name.length > 1 && image) {
      const form = new FormData();
      form.append("name", inpFields.name);
      form.append("image", inpFields.image);
      form.append("userId", myUserId);

      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/change-info`, {
        method: "POST",

        body: form,
      });
      setImg("");
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

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <MainBox>
      {showModal && (
        <Modal onClick={modalHandler}>
          <ModalDiv>
            <h3>Profile Updated</h3>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Ok
            </button>
          </ModalDiv>
        </Modal>
      )}
      {!userData && <FullPageLoader />}
      {userData && (
        <>
          <ProfileInfoBox>
            <ProfileInfo user={userData} />
          </ProfileInfoBox>
          <NavigatorSettingsDiv>
            <NavigatorTab>
              {!profileActive && (
                <div
                  onClick={() => {
                    setProfileActive(!profileActive);
                    setSecurityActive(!securityActive);
                  }}
                  className={profileActive ? "settingActive" : ""}
                >
                  Profile
                </div>
              )}
              {profileActive && (
                <div className={profileActive ? "settingActive" : ""}>
                  Profile
                </div>
              )}
              {securityActive && (
                <div className={securityActive ? "settingActive" : ""}>
                  Security
                </div>
              )}
              {!securityActive && (
                <div
                  onClick={() => {
                    setSecurityActive(!securityActive);
                    setProfileActive(!profileActive);
                  }}
                  className={securityActive ? "settingActive" : ""}
                >
                  Security
                </div>
              )}
            </NavigatorTab>
            <SettingsTab>
              {profileActive && (
                <ProfileSettingMainDiv>
                  <HeadingDiv>Change Account Information</HeadingDiv>
                  <FormBox>
                    <LabelDiv>
                      <span>Name</span>
                    </LabelDiv>
                    <Input
                      type="name"
                      placeholder="Enter Name"
                      id="name"
                      onChange={onChangeHandler}
                      value={inpFields.name}
                    />
                    <LabelDiv>
                      <span>Profile Image</span>
                    </LabelDiv>
                    <FileInput
                      type="file"
                      accept="image/*"
                      id="image"
                      onChange={imageOnChangeHandler}
                    />
                    {img && <ImgDiv image={img}></ImgDiv>}
                  </FormBox>
                  {!err && !btnLoader && (
                    <RegisterBtn onClick={onClickHandler}>
                      {!btnLoader && "Submit"}
                    </RegisterBtn>
                  )}
                  {!err && btnLoader && (
                    <RegisterBtn disabled>
                      {btnLoader && <BtnLoader />}
                    </RegisterBtn>
                  )}
                  {err && <ErrorBtn>{errText}</ErrorBtn>}
                </ProfileSettingMainDiv>
              )}
              {securityActive && (
                <SecuritySettingMainDiv>
                  <HeadingDiv>Reset Your Password</HeadingDiv>
                  <SettingPasswordReset />
                </SecuritySettingMainDiv>
              )}
            </SettingsTab>
          </NavigatorSettingsDiv>
        </>
      )}
    </MainBox>
  );
};

export default AccountSetting;
