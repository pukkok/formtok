import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../MainPageRoutes/SideBar";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { gridAtom, isSideOpenAtom, modeAtom } from "../Recoils/screenAtom";
import whiteModeLogo from '../Imgs/formtok-logo.png'
import darkModeLogo from '../Imgs/formtok-logo-white.png'
import classNames from "classnames";

const MainPageWrapper = styled.section`
    display: grid;
    grid-template-areas: 'side viewer';
    width: 100vw;
    height: 100vh;
    transition: .5s;
    // 컬러
    color: var(--white-font-color);
    // 사이드, 메인, 헤더
    --pk-first-background: var(--white-first-background);
    --pk-second-background: var(--white-second-background);
    --pk-third-background: var(--white-third-background);

    // 사이드바
    --pk-side-border-right: 1px solid var(--white-side-border-right);
    --pk-side-active: var(--white-side-active);
    --pk-side-button-hover: var(--white-side-button-hover);
    --pk-depth2-opened-depth1: var(--white-side-depth2-opened-depth1);
    --pk-user-info-border-top: var(--white-user-info-border-top);
    --pk-loginout: var(--white-loginout);

    // 제작하기
    --pk-survey-card: var(--white-survey-card);
    --pk-survey-card-hover: var(--white-create-survey-btn);
    --pk-create-survey-btn: var(--white-create-survey-btn);
    --pk-create-survey-btn-hover: var(--white-create-survey-btn-hover);

    // 모달창
    --pk-modal-background: var(--white-modal-background);
    --pk-modal-border-top: var(--white-modal-border-top);

    // 문항관리
    --pk-myquestion-card: var(--white-myquestion-card);
    --pk-myquestion-card-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
    --pk-myquestion-checkbox: var(--white-myquestion-checkbox);
    --pk-myquestion-typetext-border: var(--white-myquestion-typetext-border);
    --pk-myquestion-answer-box: var(--white-myquestion-answer-box);
    --pk-myquestion-detail-btn: var(--white-myquestion-detail-btn);

    // 검색창
    --pk-search-form-background: var(--white-search-from-background);
    &.darkmode{
        // 컬러
        color: var(--pk-light-grey);
        // 사이드, 메인, 헤더
        --pk-first-background: var(--pk-dark);
        --pk-second-background: var(--pk-deep-dark);
        --pk-third-background: var(--pk-charcoal);
        // 사이드바
        --pk-side-border-right: 1px solid var(--pk-charcoal);
        --pk-side-active: var(--pk-point);
        --pk-side-button-hover: var(--pk-charcoal);
        --pk-depth2-opened-depth1: var(--pk-charcoal);
        --pk-user-info-border-top: var(--pk-charcoal);
        --pk-loginout: var(--pk-point);
        
        // 제작하기
        --pk-survey-card: var(--pk-dark);
        --pk-survey-card-hover:var(--pk-charcoal);
        --pk-create-survey-btn: var(--pk-charcoal);
        --pk-create-survey-btn-hover: var(--pk-charcoal);

        // 모달창
        --pk-modal-background: var(--pk-charcoal);
        --pk-modal-border-top: var(--pk-charcoal);

        // 문항관리
        --pk-myquestion-card: var(--pk-dark);
        --pk-myquestion-card-shadow: none;
        --pk-myquestion-checkbox: var(--pk-silver);
        --pk-myquestion-typetext-border: var(--pk-charcoal);
        --pk-myquestion-answer-box: var(--pk-charcoal);
        --pk-myquestion-detail-btn: var(--pk-charcoal);

        --pk-search-form-background: var(--pk-dark);
    }


`

const ViewerWrapper = styled.div`
    grid-area: viewer;
    transition: background-color .3s;
    background-color: var(--pk-second-background);
    /* background-color: #f1f1f1; */
    
    overflow: scroll;  
`

function MainPage() {

    const mode = useRecoilValue(modeAtom)
    const [logo, setLogo] = useState(darkModeLogo)
    useEffect(() => {
        mode === 'dark' ? setLogo(darkModeLogo) : setLogo(whiteModeLogo)
    }, [mode])

    const [grid, setGrid] = useRecoilState(gridAtom)

    const isSideOpen = useRecoilValue(isSideOpenAtom)

    const screenRatio = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    useEffect(() => {
        isSideOpen ? setGrid(320) : setGrid(20)
    }, [isSideOpen, setGrid])

    return <MainPageWrapper style={screenRatio}
    className={classNames({'darkmode': mode === 'dark'})} 
    >
        <SideBar logo={logo}/>
        <ViewerWrapper>
            <Outlet/>
        </ViewerWrapper>
    </MainPageWrapper>
}

export default MainPage