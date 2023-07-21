import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

const TimeDiv = styled.div`
  font-size: 0.8rem;
  color: #919090;
`;
const TimeCalc = (props) => {
  const date = props.time;

  const [time, setTime] = useState(
    moment(`${date}`, "YYYYMMDD h:mm:ss ").fromNow()
  );
  setInterval(() => {
    setTime(moment(`${date}`, "YYYYMMDD h:mm:ss ").fromNow());
  }, 60000);
  return <TimeDiv>{time}</TimeDiv>;
};

export default TimeCalc;
