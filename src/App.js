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
import FormList from './MainPageRoutes/FormList';
import PageSwitcher from './Components/PageSwitcher';
import { useRecoilValue } from 'recoil';
import { modeAtom } from './Recoils/screenAtom';
import whiteModeLogo from './Imgs/formtok-logo.png'
import darkModeLogo from './Imgs/formtok-logo-white.png'
import { useState, useEffect } from 'react';

function App() {

  const mode = useRecoilValue(modeAtom)
  const [logo, setLogo] = useState(darkModeLogo)
  useEffect(() => {
      mode === 'dark' ? setLogo(darkModeLogo) : setLogo(whiteModeLogo)
  }, [mode])

  return (
    <>
      <PageSwitcher mode={mode} logo={logo}/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<MainPage mode={mode} logo={logo}/>}>
          <Route path='my-form'>
            <Route path='' element={<SurveyManager/>}/>
            <Route path='edit/:surveyId' element={<FormEditor/>}/>
            <Route path='preview/:surveyId' element={<FormViewer/>}/>
            <Route path='questions' element={<MyQuestions/>}/>
          </Route>
          <Route path='view/:surveyId' element={<FormViewer/>}/>
          <Route path='form-list' element={<FormList/>}/>
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