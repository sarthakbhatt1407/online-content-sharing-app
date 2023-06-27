import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EnvVariables } from "../data";
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
const AddNewPost = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const userId = useSelector((state) => state.userId);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  const defaultFields = {
    title: "",
    desc: "",
    image: "",
  };
  const [inpFields, setInputFields] = useState(defaultFields);

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
  const onChangeHandler = (e) => {
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
    const form = new FormData();

    form.append("title", inpFields.title);
    form.append("desc", inpFields.desc);
    form.append("image", inpFields.image);
    form.append("creator", userId);
    const res = await fetch(`${EnvVariables.BASE_URL}/api/posts/`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
    } else {
      setInputFields(defaultFields);
    }

    setInputFields(defaultFields);
  };
  return (
    <div>
      <input
        type="text"
        id="title"
        onChange={onChangeHandler}
        placeholder="Enter Title"
      />
      <input
        type="text"
        id="desc"
        onChange={onChangeHandler}
        placeholder="Enter Description"
      />
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={imageOnChangeHandler}
      />
      {img && <ImgDiv image={img}></ImgDiv>}
      <button onClick={onClickHandler}>Submit</button>
    </div>
  );
};

export default AddNewPost;
