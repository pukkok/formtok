import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import useAxios from "../C-Hooks/useAxios";
import usePageActions from "../C-Hooks/usePageActions";
import { endingMentAtom, originalDataAtom, randomUrl, surveyListStyleAtom, surveyOptionsAtom, surveyTitleAtom } from "../C-Recoils/surveyAtoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const StyledCreateFormModal = styled.dialog`
    box-sizing: border-box;
    padding: 20px;
    border-radius: 12px;
    border: solid 2px var(--pk-point);
    background-color: var(--pk-modal-background);
    color: var(--pk-modal-font);
    
    h4{font-size: 18px;}
    p{
        font-size:15px;
        margin-bottom: 2px;
    }

    & > div{ // 박스
        display: flex;
        flex-direction: column;
        
        min-width: 500px;
        min-height: 300px;

        header{
            margin-bottom: 10px;
        }

        main{
            border-top: 1px solid var(--pk-modal-border-top);
            padding: 10px 0;
            & > *{
                margin-bottom: 5px;
            }
        }

        .btns{
            border-top: 1px solid var(--pk-modal-border-top);
            padding-top: 10px;
            margin-top: auto;
            display: flex;
            justify-content: flex-end;
            gap: 16px;

            button{
                border-radius: 8px;
                padding: 6px 12px;
                color: var(--pk-light-grey);
                font-weight: bold;
                background-color: var(--pk-point);

                &:hover{
                    background-color: var(--pk-point-hover);
                }
            }
        }

        input{
            font-weight: bold;
            font-size: 18px;
            width: 100%;
            border-bottom: none;
        }
    }
`

function CreateFormModal ({token}, ref) {
    const setTitle = useSetRecoilState(surveyTitleAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)
    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const setSurveyOptions = useSetRecoilState(surveyOptionsAtom)
    const setOriginalData = useSetRecoilState(originalDataAtom)

    const naviate = useNavigate()
    const [createTitle, setCreateTitle] = useState('')
    
    const { createForm } = useAxios()
    const { createPage, loadPages } = usePageActions()
    
    // 설문지 생성
    const goToCreateForm = async () => {
        const url = randomUrl()
        const newPages = createPage()
        const newListStyle = null
        const newOptions = {
            isPublic: false,
            isOpen: false,
            isUseStartPeriod : false,
            startDate: '',
            isUseEndPeriod : false,
            endDate: '',
            isNeedLogin : false,
            isUseMaximum : false,
            maximumCount : null,
            isAllowConfirmation : false,
            isAllowModify: false,
            isRevealTheResult: false,
        }
        function setting () {
            setTitle(createTitle)
            loadPages(newPages)
            setEndingMent({title: '', description: ''})
            setSurveyListStyle(null)
            setSurveyOptions(newOptions)
            setOriginalData({
                title: createTitle, 
                pages: newPages, 
                endingMent: {title: '', description: ''}, 
                listStyle: null, 
                options: newOptions
            })
            naviate(`/my-form/edit/${url}`)
        }

        if(!token){
            setting()
            return alert('새로운 설문지가 생성되었습니다. \n저장 기능은 회원만 가능합니다.')
        }
        const success = await createForm(url, createTitle, newPages, newListStyle, newOptions, token) // 설문지 데이터 저장
        if(success){
            alert('새로운 설문지가 생성되었습니다.')
            setting()
            naviate(`/my-form/edit/${url}`)
        }
    }
    const enterClick = (e) => {
        if(e.key === 'Enter') goToCreateForm()
    }

    const closeModal = () => {
        ref.current.close()
        setCreateTitle('')
    }

    const escCloseModal = () => {
        setCreateTitle('')
    }
    
    return (
    <StyledCreateFormModal ref={ref} onKeyDown={enterClick} onClose={escCloseModal}>
        <div className="modal-content">
            <header>
                <input placeholder="설문지 제목" 
                onChange={(e)=>setCreateTitle(e.target.value)}
                value={createTitle}/>
            </header>
            <main>
                <h4>사용 안내</h4>
                <p>* 바로 제목을 입력하지 않아도 됩니다.</p>
                <p>* 설문지 제목은 이후 상단 탭에서 변경이 가능합니다.</p>
                <p>* 설문지 제작 후 상단의 저장 버튼을 이용해 주세요.</p>
                <p>* 제목은 설문지 배포시에 사용됩니다.</p>
            </main>
            <footer className="btns">
                <button onClick={goToCreateForm}>생성하기</button>
                <button onClick={closeModal}>닫기</button>
            </footer>
        </div>
    </StyledCreateFormModal>
    )
}

export default forwardRef(CreateFormModal)