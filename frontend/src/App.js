// get replicating old project format here

import { useMain } from './context/main';

function App() {

  const  { home } = useMain()
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}

export default App;
