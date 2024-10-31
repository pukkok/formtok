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

  nav{
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
        <nav>
          <button className="back" 
          // onClick={()=>navigate(-1)}
          >
            <ArrowIcon onClick={()=>{console.log('동작')}}/>
          </button>
          <button className="home" onClick={()=>navigate('/')}>
            <HomeIcon />
          </button>
        </nav>
        {children}
      </StyledLargeBox>
    )
}

export { LargeBox }