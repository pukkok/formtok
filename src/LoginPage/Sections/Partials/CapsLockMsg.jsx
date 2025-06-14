import React from "react";
import styled from "styled-components";

function CapsLockMsg ({active = false}) {

  if(!active) return null

  return (
    <StyledCapsLockMsg>캡스락이 켜져있습니다.</StyledCapsLockMsg>
  )
}

const StyledCapsLockMsg = styled.span`
  color: var(--pk-fold-point);
`

export default CapsLockMsg