import styled from "styled-components";

const StyledLargeBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 550px;
  height: 800px;
  background-color: var(--pk-charcoal);
  padding: 40px;
  box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--pk-point);
  z-index: 1;

  &.show{
    animation: show-large-box .3s ease-in forwards;
  }
  &.hide{
    animation: hide-large-box .3s ease-in forwards;
  }
  @keyframes show-large-box {
    0%{
      opacity: 0;
      margin-left: 10px;
      visibility: hidden;
    }
    100%{
      opacity: 1;
      margin-left: 0;
      visibility: visible;
    }
  }
  @keyframes hide-large-box {
    0%{
      opacity: 1;
      margin-left: 0;
      visibility: visible;
    }
    100%{
      opacity: 0;
      margin-left: 10px;
      visibility: hidden;
    }
  }

  &.right{
    left : calc(100% - 550px);
    visibility: hidden;
    &.show{
        animation: show-right-large-box .3s ease-in forwards;
    }
    &.hide{
        animation: hide-right-large-box .3s ease-in forwards;
    }
  }
  @keyframes show-right-large-box {
    0%{
      opacity: 0;
      margin-left: -10px;
      visibility: hidden;
    }
    100%{
      opacity: 1;
      margin-left: 0;
      visibility: visible;
    }
  }
  @keyframes hide-right-large-box {
    0%{
      opacity: 1;
      margin-left: 0;
      visibility: visible;
    }
    100%{
      opacity: 0;
      margin-left: -10px;
      visibility: hidden;
    }
  }
`

const LargeBoxTitle = styled.h3`
  padding-top: 110px;
  padding-bottom: 70px;
  color: var(--pk-point);
`

const StyledLargeBoxBtns = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  & > div{
      display: flex;
      align-items: center;
      gap: 5px;
      input:hover{
          font-weight: bold;
          cursor: pointer;
      }
  }

  .round-btn{
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
        background-color: var(--pk-point);
    }
  }
`

export {
  StyledLargeBox,
  StyledLargeBoxBtns,
  LargeBoxTitle
}