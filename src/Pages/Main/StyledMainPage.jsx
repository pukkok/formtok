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
    color: var(--purple-font);
    position: relative;
    overflow: hidden;
    
    font-weight: 800;
    

    .tabs{
        width: 320px; //글자가 흔들리지 않도록 크기 고정
        background-color: var(--bg-purple);
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        height: 100%;

        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        
        .logo-box{ // 로고 부분
            padding-bottom: 20px;
            button{
                margin-top: 8px;
                float: right;
                font-weight: 800;
                &:hover{
                    color: var(--light-purple-font);
                }
            }
        }

        ul, li{
            margin: 0;
            padding: 0;
            list-style: none;
        }

        li{
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            &.active{
                background-color: var(--box-purple);
                color: var(--light-purple-font);
            }
        }

        .user-info-wrapper{
            border-top: solid 1px var(--box-purple);
            padding-top: 20px;
            margin-top: auto;
            display: inline-flex;

            & > .user-info{
                display: flex;
                gap: 12px;
                align-items: center;
                span{ // 유저 아이콘
                    font-size: 44px;
                }
                
                & > div{
                    h4{
                        color: var(--light-purple-font);
                    }
                    p{
                        font-size: 14px;
                    }
                }    
            }

            button{ // 로그인 로그아웃
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 10px;
                & span{
                    font-size: 26px;
                }

                &:hover{
                    color: var(--brand-white);
                }
            }
        }
    }

    .open-tab{
        background-color: var(--bg-purple);
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
            background-color: #fff;
            padding: 5px 0;
            border-radius: 12px;
        }
    }

    span.block{
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: -1;
        right: 0;
        &.top{
            top: 0;
            background-color: #fff;
        }
        &.bottom{
            bottom: 0;
            background-color: #fff;
        }
    }
`

const StyledHeader = styled.header`
    grid-area: h;
    display: flex;
    background-color: #fdfdfd;
    align-items: center;
    padding: 20px;
    position: relative;
    z-index: 0;

    .tester{
        width: calc(100% - 40px);
        height: 100%;
        position: absolute;
        transition: 1s;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    button{
        margin-left: 10px;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: bold;
    }
    
`

const StyledViewer = styled.div`
    grid-area: v;
    background-color: #f1f1f1;
    overflow: scroll;
    
`

export {StyledMainPage as MainPageWrapper, 
    StyledSideBar as SideBarWrapper,
    StyledHeader as HeaderWrapper, 
    StyledViewer as ViewerWrapper,
}