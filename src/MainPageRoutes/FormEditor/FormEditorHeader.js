import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { endingMentAtom, pagesAtom, surveyTitleAtom } from "../../Recoils/surveyAtoms";
import { useNavigate, useParams } from "react-router-dom";
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
    input{
        width: 220px;
        font-size: 18px;
        margin-right: auto;
        padding: 4px 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 2px solid transparent;
        
        &:focus{
            overflow: none;
            background-color: var(--pk-charcoal);
            border-bottom: 2px solid var(--pk-point);
            box-shadow: inset 0 2px 15px rgba(30,30,46, .2),
            inset 0 2px 2px rgba(30,30,46, .4),
            inset 0 -1px 1px rgba(30,30,46, .4);
        }
    }

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
    const { surveyId } = useParams()
    const pages = useRecoilValue(pagesAtom)
    const [title, setTitle] = useRecoilState(surveyTitleAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const { saveForm } = useAxios() 
    const navigate = useNavigate()

    return <FormHeaderWrapper>
        <input onChange={e =>setTitle(e.target.value)} placeholder="제목없는 설문지" value={title}/>
        <button onClick={()=>navigate(`/my-form/preview/${surveyId}`)}>미리보기</button>
        <button onClick={()=>saveForm(surveyId, title, pages, endingMent, token)}>저장</button>        
    </FormHeaderWrapper>
}

export default FormHeader