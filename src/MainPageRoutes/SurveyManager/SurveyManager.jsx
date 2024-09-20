// import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AddCircleIcon, SearchIcon } from "../../Components/Icons";
import MoreVert from "../../Components/MoreVert";
import { randomUrl, surveyTitleAtom, urlAtom } from "../../Recoils/surveyAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SurveyManagerWrapper } from "./_StyledSurveyManager";
import ModalWrapper from "../../Components/StyledModal";

function SurveyManager () {
    const [surveyTitle, setSurveyTitle] = useRecoilState(surveyTitleAtom)
    const naviate = useNavigate()
    const setUrl = useSetRecoilState(urlAtom)

    // const [light, setLight] = useState('green')

    useEffect(() => {
        // console.log('url=', a)
    },[])

    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.showModal()
    }
    const closeModal = () => {
        modalRef.current.close()
    }

    const goToCreate = () => {
        let url = randomUrl()
        setUrl(url)
        naviate(`/my-form/create/${url}`)
    }
    const enterClick = (e) => {
        if(e.key === 'Enter') goToCreate()
    }
    
    const search = (e) =>{
        e.preventDefault()
        console.log('동작')
    }

    

    return (
        <SurveyManagerWrapper className="dark-mode">
            <h1>설문지 제작 사이트입니다.</h1>
            <div>
                <form>
                    <input placeholder="제목으로 찾기"/>
                    <button onClick={search}><SearchIcon/></button>
                </form>
            </div>
            <div>
                <div className="template-box">
                    <div className="card">
                        <button className="create-survey-button" onClick={openModal}>
                            <AddCircleIcon/>
                        </button>
                    </div>
                    <div className="card">
                        <div className="form-box" onClick={(e) => console.log('바깥 버튼')}>
                            <div className="form-status">
                                {/* <span className={classNames("light", light)}></span> */}
                                <MoreVert>

                                </MoreVert>
                            </div>
                            <h4>2024학년도 진로결정 및 취업지원을 위한 재학생 실태조사</h4>
                            <p>제출 0</p>
                        </div>
                    </div>
                    <button className="card">템플릿 1번</button>
                    <button className="card">템플릿 1번</button>
                    <button className="card">템플릿 1번</button>
                    <button className="card">템플릿 1번</button>
                </div>
                <ModalWrapper ref={modalRef} onKeyDown={enterClick}>
                    <div className="modal-content">
                        <header>
                            <input placeholder="설문지 제목" 
                            onChange={(e)=>setSurveyTitle(e.target.value)}
                            value={surveyTitle}/>
                        </header>
                        <main>
                            <h4>사용 안내</h4>
                            <p>* 바로 제목을 입력하지 않아도 됩니다.</p>
                            <p>* 설문지 제목은 이후 상단 탭에서 변경이 가능합니다.</p>
                            <p>* 설문지 제작 후 상단의 저장 버튼을 이용해 주세요.</p>
                            <p>* 제목은 설문지 배포시에 사용됩니다.</p>
                        </main>
                        <footer className="btns">
                            <button onClick={goToCreate}>생성하기</button>
                            <button onClick={closeModal}>닫기</button>
                        </footer>
                    </div>
                </ModalWrapper>
            </div>
        </SurveyManagerWrapper>
    )
}
export default SurveyManager





// 시작 전 // 노란 불, 중지 // 빨간 불, 종료, 진행 중 // 녹색불 , 작성 중 // 파란색

// 접속시 => 설문이 종료되었습니다.
// 시작 전 => 설문 시작일(0월 0일 09:00시) 부터 설문이 가능합니다.