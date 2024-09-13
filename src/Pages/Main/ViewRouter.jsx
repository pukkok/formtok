import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSurvey from "../CreateSurveyViewer/CreateSurvey";
import SurveyMangager from "../Viewer/SurveyManager";
import SurveyForm from "../SurveyFormViewer/SurveyForm";
import NotFoundPage from '../Viewer/NotFoundPage';
import { ViewerWrapper } from "./StyledMainPage";

function ViewRouter () {
    return (
    <ViewerWrapper>
        <Routes>
            <Route path="/" element={<SurveyMangager/>}/>
            <Route path="survey">
                <Route path="create/*" element={<CreateSurvey/>}></Route>
                <Route path="form/*" element={<SurveyForm/>}/>
            </Route>
            <Route exact path='*' element={<NotFoundPage />}/>
        </Routes>
    </ViewerWrapper>
    )
}
export default ViewRouter