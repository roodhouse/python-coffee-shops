// get replicating old project format here

import { useMain } from './context/main';
import Header from './components/Header'

function App() {

  const  { home } = useMain()

  return (
    <div id='app'>
      <div id='mainWrapper'>
          <div id='headerWrapper' className='w-full bg-gray px-[.75rem] py-[.5rem]'>
            <Header />
          </div>
        <div id='mainContainer' className='px-[.75rem]'>
        </div>

      </div>
    </div>
  );
}

export default App;
