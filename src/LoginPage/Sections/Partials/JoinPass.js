import React from "react";
import styled from "styled-components";

function JoinPass ({isComplete=false, onClick=null, children}) {
  if(isComplete) return <CompleteCheckIcon />

  return <button type="button" onClick={onClick}>{children}</button>
}

const CompleteCheckIcon = styled.span`
  width: 22px;
  height: 22px;
  transform: rotate(-45deg) translate(0px, -7px);
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #2adb2a;
    transition: .3s;
  }
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2px;
    height: 50%;
    background-color: #2adb2a;
    transition: all.3s;
  }
`
export default JoinPass