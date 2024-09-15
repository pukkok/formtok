import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<MainPage/>}/>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App