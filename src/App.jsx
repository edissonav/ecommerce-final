import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader'
import NavBar from './components/NavBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
HashRouter
Routes
Route

function App() {
  const isloading = useSelector(state=> state.isloading)


  return (
    
    <HashRouter>
      <NavBar/>
      {isloading && <Loader/>}
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route element={<ProtectedRoutes/>}>
                  <Route path='/purchases' element={<Purchases/>}/>

        </Route>
      </Routes>
      

    </HashRouter>
  )
}

export default App
