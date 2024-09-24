import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { endingMentAtom, pagesAtom, surveyTitleAtom, urlAtom } from "../../Recoils/surveyAtoms";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const FormHeaderWrapper = styled.header`
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

function FormHeader ({token}) {
    const url = useRecoilValue(urlAtom)
    const pages = useRecoilValue(pagesAtom)
    const [title, setTitle] = useRecoilState(surveyTitleAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const { saveForm } = useAxios() 
    const navigate = useNavigate()

    return <FormHeaderWrapper>
        <input onChange={e =>setTitle(e.target.value)} placeholder="제목없는 설문지" value={title}/>
        <button onClick={()=>navigate(`/survey/form/${url}`)}>미리보기</button>
        <button onClick={()=>saveForm(url, title, pages, endingMent, token)}>저장</button>        
    </FormHeaderWrapper>
}

export default FormHeader