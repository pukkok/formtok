import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../MainPageRoutes/SideBar";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { gridAtom, isSideOpenAtom } from "../Recoils/screenAtom";
import { Icon } from "../Components/Icons";
import classNames from "classnames";

const MainPageWrapper = styled.section`
    display: grid;
    grid-template-areas: 'side viewer';
    width: 100vw;
    height: 100vh;
    transition: .5s;

    .side-close-btn{
        position: absolute;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        left: 304px;
        /* top: 50%;
        transform: translateY(-50%); */
        top: 100px;
        z-index: 200;
        opacity: 0;

        &.show{
            opacity: 1;
            transition: opacity .5s;
            transition-delay: .8s;
            display: flex;
        }

        span{
            font-size: 28px;
            font-weight: 600;
            padding-right: 2px;
            color: var(--pk-deep-dark);
        }
    }

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
    --pk-modal-font: var(--white-modal-font);

    // 문항관리
    --pk-myquestion-card: var(--white-myquestion-card);
    --pk-myquestion-card-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
    --pk-myquestion-checkbox: var(--white-myquestion-checkbox);
    --pk-myquestion-typetext-border: var(--white-myquestion-typetext-border);
    --pk-myquestion-answer-box: var(--white-myquestion-answer-box);
    --pk-myquestion-detail-btn: var(--white-myquestion-detail-btn);
    --pk-myquestion-detail-btn: var(--pk-weak-purple);

    --pk-checkbox-color: var(--pk-dark); 

    // 검색창
    --pk-search-form-background: var(--white-search-from-background);

    // 설문지 제작
    --pk-form-header-bg: var(--pk-lightest-white);
    --pk-form-header-border-bottom: var(--pk-grey-line);
    --pk-form-card-border: var(--white-form-border);
    --pk-form-card-bg: var(--white-form-card-bg);
    --pk-form-card-color: var(--white-font-color);
    --pk-form-card-title-bg: var(--pk-weak-purple);

    --pk-form-editor-nav-border: var(--pk-grey-line);
    --pk-form-editor-nav: var(--white-form-editor-nav);

    --pk-form-editor-summary-title: var(--white-form-editor-nav);
    --pk-form-editor-question-summary-bg: var(--white-form-editor-question-summary-bg);
    --pk-form-editor-nav-more-vert-bg: linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.1));

    // 질문 옵션 question form
    --pk-add-extra-btn-bg: var(--pk-silver);
    --pk-question-form-bg : var(--pk-light-grey);
    --pk-question-date-indicater-filter : none;

    --pk-standard-btn-bg: var(--pk-weak-purple);

    // ck-editor
    --pk-ck-editor-bg: var(--pk-lightest-white);
    --pk-ck-editor-color: #555;
    --pk-ck-editor-tool-color: var(--white-font-color);
    --pk-ck-editor-tool-on-bg: var(--pk-weak-purple);
    --pk-ck-editor-tool-on-color: var(--pk-light-grey); 

    // 더보기 버튼
    --pk-more-btn-hover-bg: var(--pk-light-grey);
    --pk-more-btn-hover-color: var(--pk-deep-dark);
    --pk-more-options-bg: var(--pk-lightest-white);
    --pk-more-color: var(--pk-light-grey);

    // 드롭다운 버튼
    --pk-dropdown-btn-border: rgba(34, 34, 34, .1);
    --pk-dropdown-bg: var(--pk-lightest-white);
    --pk-dropdown-btn-active-border: var(--pk-silver);
    --pk-dropdown-list-hover-bg: var(--pk-light-grey);

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
        --pk-modal-background: var(--pk-dark);
        --pk-modal-border-top: var(--pk-charcoal);
        --pk-modal-font: var(--pk-light-grey);

        // 문항관리
        --pk-myquestion-card: var(--pk-dark);
        --pk-myquestion-card-shadow: none;
        --pk-myquestion-checkbox: var(--pk-silver);
        --pk-myquestion-typetext-border: var(--pk-charcoal);
        --pk-myquestion-answer-box: var(--pk-charcoal);
        --pk-myquestion-detail-btn: var(--pk-charcoal);

        --pk-checkbox-color: var(--pk-light-grey);

        --pk-search-form-background: var(--pk-dark);

        // 설문지 제작
        --pk-form-header-bg: var(--pk-deep-dark);
        --pk-form-header-border-bottom: var(--pk-charcoal); 
        --pk-form-card-border: var(--pk-charcoal);
        --pk-form-card-bg: var(--pk-dark);
        --pk-form-card-color: var(--pk-light-grey);
        --pk-form-card-title-bg: var(--pk-charcoal);

        --pk-form-editor-nav-border: var(--pk-charcoal);
        --pk-form-editor-nav: var(--pk-dark);

        --pk-form-editor-summary-title: var(--pk-dark);
        --pk-form-editor-question-summary-bg: var(--pk-charcoal);
        --pk-form-editor-nav-more-vert-bg: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4));

        // 질문 옵션 question form
        --pk-add-extra-btn-bg: var(--pk-charcoal);

        --pk-question-form-bg : var(--pk-charcoal);
        --pk-question-date-indicater-filter : invert(.8);

        --pk-standard-btn-bg: var(--pk-charcoal);
        // ck-editor
        --pk-ck-editor-bg: var(--pk-dark);
        --pk-ck-editor-color: var(--pk-medium-emphasis);
        --pk-ck-editor-tool-color: var(--pk-light-grey);
        --pk-ck-editor-tool-on-bg: var(--pk-charcoal);
        --pk-ck-editor-tool-on-color: var(--pk-point);

        // 더보기 버튼
        --pk-more-btn-hover-bg: var(--pk-light-grey);
        --pk-more-btn-hover-color: var(--pk-deep-dark);
        --pk-more-options-bg: var(--pk-charcoal);
        --pk-more-color: var(--pk-light-grey);

        // 드롭다운 버튼
        --pk-dropdown-btn-border: var(--pk-charcoal);
        --pk-dropdown-bg: var(--pk-dark);
        --pk-dropdown-btn-active-border: var(--pk-silver);
        --pk-dropdown-list-hover-bg: var(--pk-charcoal);
    }


`

const ViewerWrapper = styled.div`
    grid-area: viewer;
    transition: background-color .3s;
    background-color: var(--pk-second-background);
    overflow: scroll;  

    --pk-viewer-padding: 20px 40px;
`

function MainPage({ mode, logo }) {

    const [grid, setGrid] = useRecoilState(gridAtom)

    const [isSideOpen, setIsSideOpen] = useRecoilState(isSideOpenAtom)

    const screenRatio = {
        gridTemplateColumns : `${grid}px 1fr`
    }

    const sideOpener = () => {
        setIsSideOpen(prev => !prev)
    }

    useEffect(() => {
        isSideOpen ? setGrid(320) : setGrid(20)
    }, [isSideOpen, setGrid])

    return <MainPageWrapper style={screenRatio}
    className={classNames({'darkmode': mode === 'dark'})}>
        <SideBar logo={logo}/>
        {<button 
            className={classNames("side-close-btn", {show: isSideOpen})} 
            onClick={sideOpener}><Icon code={'chevron_left'}/></button>}
        <ViewerWrapper>
            <Outlet/>
        </ViewerWrapper>
    </MainPageWrapper>
}

export default MainPage