import { useMain } from './context/main';
import { AddFormProvider } from './context/addFormContext';
import { DashProvider } from './context/dashContext';
import Header from './components/Header'
import Home from './components/Home';
import Cities from './components/Cities';
import Footer from './components/Footer'
import Add from './components/Add';
import ThankYou from './components/ThankYou';
import Join from './components/Join';
import Register from './components/Register';
import Store from './components/Store';
import Dash from './components/Dashboard';
import NewReview from './components/NewReview';
import GMap from './components/GMap';

function App() {

  const  { home } = useMain()

  return (
    <div id='app'>
      <div id='mainWrapper' className='flex flex-col items-center'>
      <AddFormProvider>
          <div id='headerWrapper' className='w-full bg-gray px-[.75rem] py-[1rem]'>
            <Header />
          </div>
          <div id='avatarMask' />
          <div id='mainContainer' className='min-h-[75svh] w-full flex items-center justify-center'>
          
              <div id='homeWrapper' style={home === 'home' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
                <Home />
              </div>

              <div id='citiesWrapper' style={home === 'cities' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
                <Cities />
              </div>

              <div id='storeWrapper' style={home === 'store' ? {display: 'block'} : {display: 'none'}} className='w-full'>
                <Store />
              </div>

              <div id='addWrapper' style={home === 'suggest' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
                <Add />
              </div>

              <div id='newReviewWrapper' style={home === 'newReview' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem]'>
                <NewReview />
              </div>

              <div id='mapWrapper' style={home === 'map' ? {display: 'block'} : {display: 'none'}} className='w-full h-screen'>
                <GMap longitude={-97.85050201416016} latitude={30.627946853637695} type={'large'} />
              </div>
              
              <DashProvider>
                <div id='dashWrapper' style={home === 'dash' ? {display: 'block'} : {display: 'none'}} className='mt-[2rem] px-[.75rem] w-full'>
                  <Dash />
                </div>
              </DashProvider>
            
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
        </AddFormProvider>
      </div>
    </div>
  );
}

export default App;
