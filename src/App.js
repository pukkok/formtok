import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './D-Pages/LoginPage';
import MainPage from './D-Pages/MainPage'
import FormManager from './B-FormManager/FormManager';
import FormEditor from './B-FormEditor/FormEditor';
import FormViewer from './B-FormViewer/FormViewer';
import Setting from './B-Setting/Setting';
import NotFoundPage from './D-Pages/NotFoundPage';
import HomePage from './D-Pages/HomePage';
import MyQuestions from './B-MyQuestions/MyQuestions';
import FormList from './B-FormList/FormList';
import PageSwitcher from './A-Components/PageSwitcher';
import { useRecoilValue } from 'recoil';
import { modeAtom } from './C-Recoils/screenAtom';
import FormResult from './B-FormResult/FormResult';
import FormTokLogo from './A-Components/FormTokLogo';

function App() {

  const mode = useRecoilValue(modeAtom)

  return (
    <>
      <PageSwitcher mode={mode} />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<MainPage mode={mode} />}>
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