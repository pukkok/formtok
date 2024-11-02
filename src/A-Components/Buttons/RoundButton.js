import React from "react";
import styled from "styled-components";

const StyledRoundButton = styled.button`
  margin-left: auto;
  text-align: center;
  border-radius: 50px;
  min-width: 100px;
  padding: 8px 16px;
  border: solid 2px transparent;
  background-color: var(--pk-point);
  font-weight: bold;
  cursor: pointer;

  &:hover{
      background-color: var(--pk-point-hover);
  }      
`

function RoundButton ({ prop }) {
  
  return (
    <StyledRoundButton { ...prop }>
      {children}
    </StyledRoundButton>
  )
}

export default RoundButton