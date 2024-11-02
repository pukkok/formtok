import styled from "styled-components";
import HomeButton from "../../A-Components/Buttons/HomeButton";
import NavigateButton from "../../A-Components/Buttons/NavigateButton";
import { BackIcon } from "../../A-Components/Icons/Icons";

const StyledLargeBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 550px;
  height: 750px;
  background-color: var(--pk-charcoal);
  padding: 40px;
  box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--pk-point);
  z-index: 1;

  nav{
    display: flex;
    justify-content: space-between;
  }

  h3{
    padding-top: 110px;
    padding-bottom: 70px;
    color: var(--pk-point);
  }

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

function LargeBox ({className, children}) {
    
    return(
      <StyledLargeBox className={className}>
        <nav>
          <NavigateButton to={-1}><BackIcon /></NavigateButton>
          {/* <BackButton /> */}
          <HomeButton />
        </nav>
        {children}
      </StyledLargeBox>
    )
}

export { LargeBox }