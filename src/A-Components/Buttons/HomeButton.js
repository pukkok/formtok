import React from "react";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledButtonIcon } from "./StyledButton";

const HomeIcon = styled(FiHome)`
  ${ StyledButtonIcon }
`

function HomeButton () {
  
  const navigate = useNavigate()

  return (
    <StyledButton onClick={()=>navigate('/')}>
      <HomeIcon />
    </StyledButton>
  )
}

export default HomeButton