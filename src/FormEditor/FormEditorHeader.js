import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { endingMentAtom, pagesAtom, surveyListStyleAtom, surveyOptionsAtom, surveyTitleAtom } from "../Recoils/surveyAtoms";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import MoveToLoginPageModal from "./MoveToLoginPageModal";

const FormHeaderWrapper = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    background-color: var(--pk-form-header-bg);  
    border-bottom: 1px solid var(--pk-form-header-border-bottom);
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    padding: 0 20px;
    z-index: 100;
    input{
        width: 300px;
        font-size: 18px;
        margin-right: auto;
        padding: 6px 10px 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 2px solid transparent;
        
        &:focus, &:hover{
            overflow: none;
            border: 2px solid var(--pk-point);
            border-radius: 12px;
        }
    }

    & > button{
        background-color: var(--pk-point);
        color: var(--pk-light-grey);

        margin-left: 10px;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: bold;
    }
`


function FormHeader () {
    const { surveyId } = useParams()
    const pages = useRecoilValue(pagesAtom)
    const [title, setTitle] = useRecoilState(surveyTitleAtom)
    const surveyListStyle = useRecoilValue(surveyListStyleAtom)
    const surveyOptions = useRecoilValue(surveyOptionsAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const { saveForm } = useAxios() 
    const navigate = useNavigate()

    const modalRef = useRef(null)

    const saveFormAction = async () => {
        let success = await saveForm(surveyId, title, pages, endingMent, surveyListStyle, surveyOptions)
        if(!success){
            modalRef.current.showModal()
        }
    }

    return <FormHeaderWrapper>
        <input onChange={e =>setTitle(e.target.value)} placeholder="제목없는 설문지" value={title}/>
        <button onClick={()=>navigate(`/my-form/preview/${surveyId}`)}>미리보기</button>
        <button onClick={saveFormAction}>저장</button>        

        <MoveToLoginPageModal ref={modalRef}/>
    </FormHeaderWrapper>
}

export default FormHeader