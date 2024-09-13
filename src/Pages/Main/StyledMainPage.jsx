import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMainPage = styled.section`
    display: grid;
    grid-template-areas: 
    's h'
    's v';
    grid-template-rows: 50px 1fr;
    height: 100vh;
    transition: .5s;
`

const StyledSideBar = styled.div`
    grid-area: s;
    background-color: #414141;
    color: #fff;
    position: relative;

    .tabs{
        padding: 10px 20px;
        width: 250px;
    }

    .top{
        display: flex;
        align-items: center;
        height: 50px;

        button{
            margin-left: auto;
        }
    }

    .open-tab{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &::after{
            position: fixed;
            content: '';
            width: 5px;
            height: 20px;
            background-color: white;
            padding: 5px 0;
            border-radius: 12px;
        }
    }
`

const StyledHeader = styled.header`
    grid-area: h;
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 20px;
    
    .btns{
        margin-left: auto;

        button{
            margin-left: 10px;
            padding: 6px 12px;
            border-radius: 8px;
            font-weight: bold;
        }
    }
`

const StyledViewer = styled.div`
    grid-area: v;
    background-color: #f1f1f1;
    overflow: scroll;
`

const StyledLogo = styled.span`
    font-family: "Nanum Pen Script", cursive;
    font-size: 30px;
    font-weight: 400;
    font-style: normal;
    cursor: pointer;
`

function Logo () {
    const naviate = useNavigate()
    return <StyledLogo onClick={()=>naviate('/')}>PK&SURVEY</StyledLogo>
}

export {StyledMainPage as MainPageWrapper, 
    StyledSideBar as SideBarWrapper,
    StyledHeader as HeaderWrapper, 
    StyledViewer as ViewerWrapper,
    Logo
}