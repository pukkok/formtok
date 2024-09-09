import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage'
import './styles/index.css';
import FindAddress from './components/FindAddress'

const {kakao} = window // 카카오 맵 사용

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/*' element={<MainPage/>}/>
        <Route path='test' element={<FindAddress/>}/>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='join' element={<LoginPage selectedForm='join'/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
