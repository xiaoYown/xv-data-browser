import React, { useState } from 'react';
import './App.css';

import Coat from './core/components/Coat';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="App"
      onClick={() => setCount(count + 1)}
    >
      <Coat count={ count } />
    </div>
  );
}

export default App;
