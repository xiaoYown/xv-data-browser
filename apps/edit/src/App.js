import './App.css';
import React, { useState, useEffect } from 'react';

import Coat from './core/components/Coat';

/* 事件使用案例 */
function handleClickWindow (e) {
  console.log('on click window: ', e);
}
function handleUndo (e) {
  console.log('on undo: ', e);
}
function handleRedo (e) {
  console.log('on redo: ', e);
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    React.busMouseMaps.on('click-window', handleClickWindow);
    React.busKeyMaps.on('undo', handleUndo);
    React.busKeyMaps.on('redo', handleRedo);
    return () => {
      React.busMouseMaps.removeListener('click-window', handleClickWindow);
      React.busKeyMaps.removeListener('undo', handleUndo);
      React.busKeyMaps.removeListener('redo', handleRedo);
    }
  });

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
