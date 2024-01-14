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
import Store from './components/Store';

function App() {

  const  { home } = useMain()

  return (
    <div id='app'>
      <div id='mainWrapper' className='flex flex-col items-center'>
        <div id='headerWrapper' className='w-full bg-gray px-[.75rem] py-[1rem]'>
          <Header />
        </div>
        {/* <div id='mainContainer' className='min-h-[75svh] w-full flex items-center justify-center'> */}
        {/* undo when done creating store page */}
        <div id='mainContainer' className='w-full flex items-center justify-center'>
          <div id='homeWrapper' style={home === 'home' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
            <Home />
          </div>

          <div id='citiesWrapper' style={home === 'cities' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
            <Cities />
          </div>

          <div id='storeWrapper' style={home === 'store' ? {display: 'block'} : {display: 'none'}} className='w-full'>
            <Store />
          </div>

          <AddFormProvider>
            <div id='addWrapper' style={home === 'suggest' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
              <Add />
            </div>
          </AddFormProvider>
          <div id='joinWrapper' style={home === 'join' ? {display: 'block'} : {display: 'none'}} className='w-full px-[.75rem]'>
            <Join />
          </div>
          <div id='registerWrapper' style={home === 'register' ? {display: 'block'} : {display: 'none'}} className='w-full px-[.75rem]'>
            <Register />
          </div>
          <div id='thankYouWrapper' style={home === 'thankYou' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
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
