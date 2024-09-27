import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import './App.css';
import MainPage from './Pages/MainPage'
import SurveyManager from './MainPageRoutes/SurveyManager/SurveyManager';
import FormEditor from './MainPageRoutes/FormEditor/FormEditor';
import FormViewer from './MainPageRoutes/FormViewer/FormViewer';
import Setting from './MainPageRoutes/Setting/Setting';
import NotFoundPage from './Pages/NotFoundPage';
import HomePage from './Pages/HomePage';
import MyQuestions from './MainPageRoutes/MyQuestions/MyQuestions';
import SurveyAnswer from './MainPageRoutes/SurveyAnswer/SurveyAnswer';
import PageSwitcher from './Components/PageSwitcher';

function App() {

  return (
    <>
      <PageSwitcher/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<MainPage/>}>
          <Route path='my-form'>
            <Route path='' element={<SurveyManager/>}/>
            <Route path='edit/:surveyId' element={<FormEditor/>}/>
            <Route path='preview/:surveyId' element={<FormViewer/>}/>
            <Route path='questions' element={<MyQuestions/>}/>
          </Route>
          <Route path='view/:surveyId' element={<FormViewer/>}/>
          <Route path='survey-answer' element={<SurveyAnswer/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App