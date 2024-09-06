import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyManager () {
    const [surveyTitle, setSurveyTitle] = useState('')
    const naviate = useNavigate()

    const [light, setLight] = useState('green')

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

    const search = (e) =>{
        e.preventDefault()
        console.log('동작')
    }

    return (
        <section className="survey-manager">
            <h1>설문지 제작 사이트입니다.</h1>
            <div>
                <form>
                    <input placeholder="제목으로 찾기"/>
                    <button onClick={search}>
                        <SearchIcon/>
                    </button>
                </form>
            </div>
            <div>
                <div className="template-box">
                    <div className="rectangle">
                        <button className="icon-box" onClick={openModal}>
                            <AddSurveyIcon/>
                        </button>
                    </div>
                    <div className="rectangle">
                        <div className="form-box" onClick={(e) => console.log('바깥 버튼')}>
                            <div className="form-status">
                                <span className={classNames("light", light)}></span>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    console.log('안쪽버튼')}}>
                                    <img src={`${origin}/icons/three-dot-icon-black.png`}/>
                                </button>
                            </div>
                            <h4>2024학년도 진로결정 및 취업지원을 위한 재학생 실태조사</h4>
                            <p>제출 0</p>
                        </div>
                    </div>
                    <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button>
                    <button className="rectangle">템플릿 1번</button>
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
            {/* <div className="">
                2024학년도 진로결정 및 취업지원을 위한 재학생 실태조사
            </div> */}
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

function SearchIcon () {

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="white" fillOpacity="0.01"/>
        <path d="M14.8231 15.8831C13.7125 16.725 12.3237 17.114 10.9373 16.9714C9.55098 16.8287 8.27048 16.1651 7.35462 15.1146C6.43876 14.0642 5.95584 12.7052 6.00346 11.3123C6.05108 9.91947 6.62569 8.59663 7.61116 7.61116C8.59663 6.62569 9.91947 6.05108 11.3123 6.00346C12.7052 5.95584 14.0642 6.43876 15.1146 7.35462C16.1651 8.27048 16.8287 9.55098 16.9714 10.9373C17.114 12.3237 16.725 13.7125 15.8831 14.8231L18.5301 17.4701C18.8231 17.7631 19.0601 18.0601 18.5301 18.5301C18.0001 19.0001 17.7631 18.8231 17.4701 18.5301L14.8231 15.8831ZM11.5001 15.5001C12.5609 15.5001 13.5783 15.0786 14.3285 14.3285C15.0786 13.5783 15.5001 12.5609 15.5001 11.5001C15.5001 10.4392 15.0786 9.42177 14.3285 8.67162C13.5783 7.92148 12.5609 7.50005 11.5001 7.50005C10.4392 7.50005 9.42177 7.92148 8.67162 8.67162C7.92148 9.42177 7.50005 10.4392 7.50005 11.5001C7.50005 12.5609 7.92148 13.5783 8.67162 14.3285C9.42177 15.0786 10.4392 15.5001 11.5001 15.5001Z"
            fill="#42526E"/>
        </svg>
    )
}

// 시작 전 // 노란 불, 중지 // 빨간 불, 종료, 진행 중 // 녹색불 , 작성 중 // 파란색

// 접속시 => 설문이 종료되었습니다.
// 시작 전 => 설문 시작일(0월 0일 09:00시) 부터 설문이 가능합니다.