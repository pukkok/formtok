import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage'

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
