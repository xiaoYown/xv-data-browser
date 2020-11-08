import './App.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Index from './views/index';

/* 事件使用案例 */
function handleClickWindow (e) {
  console.log('on click window');
}
function handleUndo () {
  console.log('on undo');
}
function handleRedo () {
  console.log('on redo');
}
function handleCopy () {
  console.log('on copy');
}
function handleCut () {
  console.log('on cut');
}
function handlePaste () {
  console.log('on paste');
}
console.log(process.env.RUN_ENV)
function App() {
  useEffect(() => {
    React.busMouseMaps.on('click-window', handleClickWindow);
    React.busKeyMaps.on('undo', handleUndo);
    React.busKeyMaps.on('redo', handleRedo);
    React.busKeyMaps.on('copy', handleCopy);
    React.busKeyMaps.on('cut', handleCut);
    React.busKeyMaps.on('selectall', handlePaste);
    return () => {
      React.busMouseMaps.removeListener('click-window', handleClickWindow);
      React.busKeyMaps.removeListener('undo', handleUndo);
      React.busKeyMaps.removeListener('redo', handleRedo);
      React.busKeyMaps.removeListener('copy', handleCopy);
      React.busKeyMaps.removeListener('cut', handleCut);
      React.busKeyMaps.removeListener('paste', handlePaste);
    }
  });

  return (
    <div className="App">
      <Provider store={store}>
        <Index />
      </Provider>
    </div>
  );
}

export default App;
