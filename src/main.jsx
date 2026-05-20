import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter , Routes , Route } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Cart from './components/pages/Cart.jsx'
import MainLayout from './components/common/MainLayout.jsx'
import FavCart from './components/pages/FavCart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/cart'} element={<Cart/>} />
        <Route path={'/favcart'} element={<FavCart/>} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
