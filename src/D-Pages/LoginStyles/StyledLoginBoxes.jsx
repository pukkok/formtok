import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiHome } from "react-icons/fi";

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

  header{
    display: flex;
    justify-content: space-between;
    button.home, button.back{
      &:hover{
        transition: .2s;
        scale: 1.1;
      }
      span{
        color: var(--pk-point);
        font-size: 28px;
      }
    }
  }

  h2{
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

const strokeStyle = css`
  font-size: 20px;
  stroke-width: 2.3px;
  color: var(--pk-purple-font);
`

const HomeIcon = styled(FiHome)`
  ${strokeStyle}
`

const ArrowIcon = styled(IoArrowBack)`
  ${strokeStyle}
`

function LargeBox ({className, children}) {

    const navigate = useNavigate()
    return(
        <StyledLargeBox className={className}>
            <header>
                <button className="back" onClick={()=>navigate(-1)}>
                    <ArrowIcon />
                </button>
                <button className="home" onClick={()=>navigate('/')}>
                    <HomeIcon />
                </button>
            </header>
            {children}
        </StyledLargeBox>
    )
}

export { LargeBox, 
    StyledSmallBoxWrapper as SmallBoxWrapper , 
    StyledSmallBox as SmallBox
}