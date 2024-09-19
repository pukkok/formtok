import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import SurveyCreater from "./SurveyCreater/SurveyCreater";
import SurveyMangager from "./SurveyManager/SurveyManager";
import SurveyForm from "./SurveyForm/SurveyForm";
import NotFoundPage from '../Pages/NotFoundPage';
import FAQViewer from "./FAQList/FAQViewer";
import Setting from "./Setting/Setting";

const ViewerWrapper = styled.div`
    grid-area: viewer;
    background-color: #1E1E2E;  // 다크 모드 배경색
    overflow: scroll;  
`

function ViewRouter () {

    return (
    <ViewerWrapper>
        <Routes>
            <Route path="/" element={<SurveyMangager/>}/>
            <Route path="survey">
                <Route path="create/*" element={<SurveyCreater/>}></Route>
                <Route path="form/*" element={<SurveyForm/>}/>
                <Route path="FAQ" element={<FAQViewer/>}/>
            </Route>
            <Route path="setting" element={<Setting/>}/>
            <Route exact path='*' element={<NotFoundPage />}/>
        </Routes>
    </ViewerWrapper>
    )
}
export default ViewRouter