import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import MainPage from './Pages/Main/MainPage'
import './styles/index.css';
import Imsi from './Pages/IMSI/Imsi';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/*' element={<MainPage/>}/>
        <Route path='imsi' element={<Imsi/>}/>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App