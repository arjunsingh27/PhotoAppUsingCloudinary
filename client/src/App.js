import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Gallery from './pages/Gallery'
import PhotoDetail from './pages/PhotoDetail'
import Upload from './pages/Upload'
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App