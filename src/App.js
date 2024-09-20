import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import './App.css';
import MainPage from './Pages/MainPage'
import SurveyManager from './MainPageRoutes/SurveyManager/SurveyManager';
import FormEditor from './MainPageRoutes/FormEditor/FormEditor';
import SurveyForm from './MainPageRoutes/SurveyForm/SurveyForm';
import Setting from './MainPageRoutes/Setting/Setting';
import NotFoundPage from './Pages/NotFoundPage';
import FAQViewer from './MainPageRoutes/FAQList/FAQViewer';

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainPage/>}>
          <Route path='my-form'>
            <Route path='' element={<SurveyManager/>}/>
            <Route path='create/:surveyId' element={<FormEditor/>}/>
            <Route path='form/:surveyId' element={<SurveyForm/>}/>
            <Route path='FAQ' element={<FAQViewer/>}/>
          </Route>
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