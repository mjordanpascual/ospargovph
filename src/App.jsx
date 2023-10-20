import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppHeader from './components/header/AppHeader'
import AppMain from './components/main/AppMain'
import NewsEvents from './components/NewsEvents'


function App() {

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' exact element={ <AppMain />  } />
          <Route path='/news&events' element={ <NewsEvents />  } />

          <Route path="*" element={ <h1 className='text-danger text-center p-5'>Page not found 404.</h1> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
