import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyManager () {
    const [surveyTitle, setSurveyTitle] = useState('')
    const naviate = useNavigate()

    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.showModal()
    }
    const goToCreate = () => {
        let url = ''
        surveyTitle === '' ? url = '제목없는 설문지' : url = surveyTitle
        naviate(`/survey/create/${url}`)
    }
    const closeModal = () => {
        modalRef.current.close()
    }

    return (
        <section className="survey-manager">
            <div>설문지 제작 사이트입니다.</div>
            <div>
                <div className="template-box">
                    <div className="rectangle">
                        <button className="icon-box" onClick={openModal}>
                            <AddSurveyIcon/>
                        </button>
                    </div>
                    {/* <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button> */}
                </div>
                <dialog ref={modalRef} className="modal">
                    <div>
                        <input placeholder="설문지 제목" 
                        onChange={(e)=>setSurveyTitle(e.target.value)}
                        value={surveyTitle}/>
                        <h4>사용 안내</h4>
                        <p>* 제목을 입력하지 않아도 문제가 발생하지 않습니다.</p>
                        <p>* 제목은 설문 제작자가 관리하기 편하기 위하여 사용합니다.</p>
                        <p>* 설문지 제목은 이후 상단 탭에서 변경이 가능합니다.</p>
                        <div className="btns">
                            <button onClick={goToCreate}>생성하기</button>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="">
                2024학년도 진로결정 및 취업지원을 위한 재학생 실태조사
            </div>
        </section>
    )
}
export default SurveyManager

function AddSurveyIcon() {
    
    return (
        <svg fill="none" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <path d="m28 0.44434c15.194 0 27.556 12.362 27.556 27.556s-12.362 27.556-27.556 27.556-27.556-12.362-27.556-27.556 12.362-27.556 27.556-27.556zm-10.598 29.675h8.4787v8.4787c0 0.5621 0.2233 1.1013 0.6208 1.4988s0.9366 0.6208 1.4988 0.6208 1.1013-0.2233 1.4988-0.6208 0.6209-0.9367 0.6209-1.4988v-8.4787h8.4786c0.5622 0 1.1013-0.2233 1.4988-0.6208s0.6209-0.9366 0.6209-1.4988-0.2234-1.1013-0.6209-1.4988-0.9366-0.6209-1.4988-0.6209h-8.4786v-8.4786c0-0.5622-0.2234-1.1013-0.6209-1.4988s-0.9366-0.6209-1.4988-0.6209-1.1013 0.2234-1.4988 0.6209-0.6208 0.9366-0.6208 1.4988v8.4786h-8.4787c-0.5621 0-1.1013 0.2234-1.4988 0.6209s-0.6208 0.9366-0.6208 1.4988 0.2233 1.1013 0.6208 1.4988 0.9367 0.6208 1.4988 0.6208z"/>
        </svg>
    )

}