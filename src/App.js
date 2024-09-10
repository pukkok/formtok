import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage'
import './styles/index.css';
import FindAddress from './components/FindAddress'

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/*' element={<MainPage/>}/>
        <Route path='test' element={<FindAddress/>}/>
        <Route path='user'>
          <Route path='login' element={<LoginPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
