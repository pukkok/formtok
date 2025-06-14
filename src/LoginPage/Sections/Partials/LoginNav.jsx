import React from "react";
import NavigateButton from "../../../A-Components/Buttons/NavigateButton";
import { BackIcon, HomeIcon } from "../../../A-Components/Icons/Icons";
import styled from "styled-components";

function LoginNav () {

  return (
    <StyledLoginNav>
      <NavigateButton to={-1}><BackIcon/></NavigateButton>
      <NavigateButton to={'/'}><HomeIcon/></NavigateButton>
    </StyledLoginNav>
  )
}

export default LoginNav

const StyledLoginNav = styled.nav`
  display: flex;
  justify-content: space-between;

  button{
    color: var(--pk-purple-font);
  }
`