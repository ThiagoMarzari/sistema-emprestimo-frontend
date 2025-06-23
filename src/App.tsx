import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home.tsx'
import Layout from './pages/Layout/Layout.tsx'
import { Toaster } from 'react-hot-toast'
import Logs from './pages/Logs/Logs.tsx'
import Register from './pages/RegisterItem/Register.tsx'

function App() {

  return (
     <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <Routes>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registerItem" element={<Register />} />
          <Route path="/logs" element={<Logs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
