import React from "react";
import Modal from "../../Components/Modal";
import styled from "styled-components";

const CreateFormModalWrapper = styled.div`
    
`

function CreateFormModal () {
    <Modal>
        <header>
            <form>
                <input placeholder="설문지 제목" 
                onChange={(e)=>setCreateTitle(e.target.value)}
                value={createTitle}/>
                <input type="submit" style={{display: "none"}}
                onClick={e => {
                    e.preventDefault() 
                    goToCreateForm()
                }} />
            </form>
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
            <button onClick={()=>closeModal(createModalRef)}>닫기</button>
        </footer>
    </Modal>
}