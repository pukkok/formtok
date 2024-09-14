import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSurvey from "../CreateSurveyViewer/CreateSurvey";
import SurveyMangager from "../Viewer/SurveyManager";
import SurveyForm from "../SurveyFormViewer/SurveyForm";
import NotFoundPage from '../Viewer/NotFoundPage';
import { ViewerWrapper } from "./StyledMainPage";
import { useRecoilState } from "recoil";
import { ViewerBGAtom } from "../../recoils/surveyAtoms";

function ViewRouter () {
    const [viewerBG, setViewerBG] = useRecoilState(ViewerBGAtom)

    return (
    <ViewerWrapper style={{backgroundColor : viewerBG}}>
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