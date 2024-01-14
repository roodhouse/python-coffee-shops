import { useMain } from './context/main';
import { AddFormProvider } from './context/addFormContext';
import Header from './components/Header'
import Home from './components/Home';
import Cities from './components/Cities';
import Footer from './components/Footer'
import Add from './components/Add';
import ThankYou from './components/ThankYou';
import Join from './components/Join';
import Register from './components/Register';

function App() {

  const  { home } = useMain()

  return (
    <div id='app'>
      <div id='mainWrapper' className='flex flex-col items-center'>
        <div id='headerWrapper' className='w-full bg-gray px-[.75rem] py-[1rem]'>
          <Header />
        </div>
        <div id='mainContainer' className='px-[.75rem] min-h-[75svh] w-full flex items-center justify-center'>
          <div id='homeWrapper' style={home === 'home' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem]'>
            <Home />
          </div>
          <div id='citiesWrapper' style={home === 'cities' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem]'>
            <Cities />
          </div>
          <AddFormProvider>
            <div id='addWrapper' style={home === 'suggest' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem]'>
              <Add />
            </div>
          </AddFormProvider>
          <div id='joinWrapper' style={home === 'join' ? {display: 'block'} : {display: 'none'}} className='w-full'>
            <Join />
          </div>

          <div id='registerWrapper' style={home === 'register' ? {display: 'block'} : {display: 'none'}} className='w-full'>
            <Register />
          </div>
          <div id='thankYouWrapper' style={home === 'thankYou' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem]'>
            <ThankYou />
          </div>
        </div>

        <div id='footerWrapper' className='w-full bg-gray flex justify-center'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
