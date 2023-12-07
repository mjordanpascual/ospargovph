import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppHeader from './components/header/AppHeader'
import AppMain from './components/main/AppMain'
import Services from './components/Services'
import Doctors from './components/Doctors'
import NewsEvents from './components/NewsEvents'
import About from './components/About'
import Contact from './components/Contact'


function App() {

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' exact element={ <AppMain />  } />
          <Route path='/services' element={ <Services /> } />
          <Route path='/doctors' element={ <Doctors /> } />
          <Route path='/newsevents' element={ <NewsEvents />  } />
          <Route path='/about' element={ <About />  } />
          <Route path='/contact' element={ <Contact />  } />

          <Route path="*" element={ <h1 className='text-danger text-center p-5'>Page not found 404.</h1> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
