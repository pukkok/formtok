import React from "react";
import { Route, Routes } from "react-router-dom";
import SurveyCreater from "./ViewRoutes/SurveyCreater/SurveyCreater";
import SurveyMangager from "./ViewRoutes/SurveyManager/SurveyManager";
import SurveyForm from "./ViewRoutes/SurveyForm/SurveyForm";
import NotFoundPage from '../Pages/NotFoundPage';
import { ViewerWrapper } from "./_StyledMainPage";
import { useRecoilState } from "recoil";
import { ViewerBGAtom } from "../Recoils/surveyAtoms";

function ViewRouter () {
    const [viewerBG, setViewerBG] = useRecoilState(ViewerBGAtom)

    return (
    <ViewerWrapper 
    // style={{backgroundColor : viewerBG}}
    >
        <Routes>
            <Route path="/" element={<SurveyMangager/>}/>
            <Route path="survey">
                <Route path="create/*" element={<SurveyCreater/>}></Route>
                <Route path="form/*" element={<SurveyForm/>}/>
            </Route>
            <Route exact path='*' element={<NotFoundPage />}/>
        </Routes>
    </ViewerWrapper>
    )
}
export default ViewRouter