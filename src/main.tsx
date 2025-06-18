import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Layout from './pages/Layout.tsx'
import RegisterItem from './pages/RegisterItem.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registerItem" element={<RegisterItem />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
