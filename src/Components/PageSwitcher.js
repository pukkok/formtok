import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { switchTheScreenAtom } from "../Recoils/screenAtom";
import classNames from "classnames";

const PageSwitcherWrapper = styled.section`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    z-index: 100;
    bottom: -100vh;
    width: 100vw;
    height: 100vh;
    background-color: var(--pk-deep-dark);
    &.switching{
        animation: hidingScreen 1s ease-in-out forwards;
    }

    @keyframes hidingScreen {
        0%{
            bottom: -100vh;
        }
        25%{
            bottom: 0;
        }
        50%{
            bottom: 0;
        }
        75%{
            bottom: 0;
        }
        100%{
            bottom: 100vh;
            
        }
    }
`


function PageSwitcher () {
    const switchTheScreen = useRecoilValue(switchTheScreenAtom)

    return <PageSwitcherWrapper className={classNames({switching: switchTheScreen==='go'})}>
        폼톡~!
    </PageSwitcherWrapper>
}

export default PageSwitcher