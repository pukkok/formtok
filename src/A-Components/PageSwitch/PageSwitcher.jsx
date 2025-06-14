import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { switchTheScreenAtom } from "../../C-Recoils/screenAtom";
import classNames from "classnames";
import FormTokLogo from "../FormTokLogo";

const PageSwitcherWrapper = styled.section`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    z-index: 1000;
    bottom: -100vh;
    width: 100vw;
    height: 100vh;
    background-color: var(--pk-lightest-white);
    color: var(--white-font-color);

    img{
        width: 160px;
        height: 160px;
        filter: drop-shadow(0 0 6px var(--pk-charcoal));
    }

    &.dark{
        background-color: var(--pk-deep-dark);
        color: var(--pk-silver);
        img{
            filter: drop-shadow(0 0 12px var(--pk-yellow));
        }
    }
    &.switching{
        animation: hidingScreen 1s ease-in-out forwards;
    }

    @keyframes hidingScreen {
        0%{
            height: 0;
            bottom: -100vh;
        }
        25%{
            
            bottom: 0;
        }
        50%{
            height: 100vh;
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


function PageSwitcher ({ mode }) {
    const switchTheScreen = useRecoilValue(switchTheScreenAtom)

    return (
        <PageSwitcherWrapper className={classNames({dark : mode === 'dark', switching: switchTheScreen==='go'})}>
            <FormTokLogo boxSize={180}/>
        </PageSwitcherWrapper>
    )
}

export default PageSwitcher