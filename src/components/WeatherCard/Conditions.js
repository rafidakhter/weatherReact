import React from "react";
import styled from "@emotion/styled";

const Condition = ({ temp, condition }) => {
  const Container = styled.div`
    text-align: center;
  `;

  const Temp = styled.h1`
    font-family: "Fira Sans", sans-serif;
    font-size: 2rem;
  `;

  const State = styled.h3`
    font-family: "Fira Sans", sans-serif;
    font-size: 1.2rem;
  `;

  return (
    <Container>
      <Temp>{temp}°C</Temp>
      <State ClassName="condition">{condition}</State>
    </Container>
  );
};

export default Condition;
