import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Layout from './pages/Layout.tsx'
import RegisterItem from './pages/RegisterItem/RegisterItem.tsx'
import { Toaster } from 'react-hot-toast'
import Logs from './pages/Logs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registerItem" element={<RegisterItem />} />
          <Route path="/logs" element={<Logs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
