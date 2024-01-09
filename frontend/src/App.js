import { useMain } from './context/main';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer'

function App() {

  const  { home } = useMain()

  return (
    <div id='app'>
      <div id='mainWrapper'>
        <div id='headerWrapper' className='w-full bg-gray px-[.75rem] py-[1rem]'>
          <Header />
        </div>
        <div id='mainContainer' className='px-[.75rem] mt-[2rem]'>
          <div id='homeWrapper' style={home ? {display: 'block'} : {display: 'none'}}>
            <Home />
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
