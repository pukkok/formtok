import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';

import DashBoardPage from './DashBoard/DashBoardPage'
import FormManager from './DashBoard/CreateForm/FormManager';
import FormEditor from './B-FormEditor/FormEditor';
import FormViewer from './B-FormViewer/FormViewer';
import Setting from './B-Setting/Setting';
import MyQuestions from './B-MyQuestions/MyQuestions';
import FormList from './B-FormList/FormList';
import PageSwitcher from './A-Components/PageSwitch/PageSwitcher';
import { useRecoilValue } from 'recoil';
import { modeAtom } from './C-Recoils/screenAtom';
import FormResult from './B-FormResult/FormResult';
import FormTokLogo from './A-Components/FormTokLogo';

import NotFoundPage from './A-Components/NotFoundPage';

function App() {

  const mode = useRecoilValue(modeAtom)

  return (
    <>
      <PageSwitcher mode={mode} />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route element={<DashBoardPage mode={mode} />}>
          <Route path='my-form'>
            <Route path='manager' element={<FormManager/>}/>
            <Route path='edit/:surveyId' element={<FormEditor/>}/>
            <Route path='preview/:surveyId' element={<FormViewer/>}/>
            <Route path='questions' element={<MyQuestions/>}/>
            <Route path='result' element={<FormResult/>}/>
          </Route>
          <Route path='view/:surveyId' element={<FormViewer/>}/>
          <Route path='/form-list' element={<FormList/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
        <Route path='test' element={<FormTokLogo />}></Route>
      </Routes>
    </>
  )
}

export default App