import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { pagesAtom, surveyTitleAtom, urlAtom } from "../../Recoils/surveyAtoms";
import { useHref, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxtios";

const HeaderWrapper = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    background-color: var(--pk-deep-dark);  // 다크 모드 배경색
    border-bottom: 1px solid var(--pk-charcoal);
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    padding: 0 20px;
    z-index: 100;

    button{
        background-color: var(--pk-point);
        color: var(--pk-light-grey);

        margin-left: 10px;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: bold;
    }
`

function SurveyHeader () {
    const url = useRecoilValue(urlAtom)
    const pages = useRecoilValue(pagesAtom)
    const title = useRecoilValue(surveyTitleAtom)
    const token = localStorage.getItem('token')

    const { createForm } = useAxios() 
    const navigate = useNavigate()

    return <HeaderWrapper>
        <button onClick={()=>navigate(`/survey/form/${url}`)}>미리보기</button>
        <button onClick={()=>createForm(url, title, pages, token)}>임시저장</button>        
    </HeaderWrapper>
}

export default SurveyHeader