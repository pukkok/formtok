const StyledHeader = styled.header`
    grid-area: h;
    display: flex;
    background-color: var(--pk-deep-dark);  // 다크 모드 배경색
    border-bottom: 1px solid var(--pk-charcoal);
    align-items: center;
    padding: 30px 20px;
    position: relative;
    z-index: 100;

    &.create{
        /* display: flex; */
        align-items: center;
        justify-content: flex-end;
        button{
            background-color: var(--pk-point);
            color: #fff;
        }
    }

    button{
        margin-left: 10px;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: bold;
    }
  display: none;
`

export {StyledMainPage as MainPageWrapper, 
    StyledSideBar as SideBarWrapper,
    StyledHeader as HeaderWrapper, 
    StyledViewer as ViewerWrapper,
}