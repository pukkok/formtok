import styled from "styled-components";

const StyledSmallBoxWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 580px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: var(--pk-dark);
  box-shadow: 0 0px 20px rgba(22, 22, 22, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledSmallBox = styled.div`
  color: #aaa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
  width: 400px;
  height: 50%;

  &.show{
    animation: show-small-box .5s forwards;
  }
  &.hide{
    animation: hide-small-box .5s forwards;
  }
  @keyframes hide-small-box {
    0%{
      opacity: 1;
      margin-top: 0px;
      visibility: visible;
    }
    100%{
      opacity: 0;
      margin-top: 15px;
      visibility: hidden;
    }
  }
  @keyframes show-small-box {
    0%{
      opacity: 0;
      margin-top: 15px;
      visibility: hidden;
    }
    100%{
      opacity: 1;
      margin-top: 0;
      visibility: visible;
    }
  }

  button{
    border-radius: 50px;
    padding: 10px 20px;
    border: solid 2px #aaa;

    &:hover{
      border: solid 2px var(--pk-point);
      font-weight: bold;
    }
  }
`

export {StyledSmallBoxWrapper, StyledSmallBox}