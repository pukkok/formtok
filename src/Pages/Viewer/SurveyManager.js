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
                    <button className="square" onClick={openModal}>새로 만들기</button>
                    <button className="square">템플릿 1번</button>
                    <button className="square">템플릿 1번</button>
                    <button className="square">템플릿 1번</button>
                    <button className="square">템플릿 1번</button>
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