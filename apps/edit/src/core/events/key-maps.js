import EventEmitter from 'eventemitter3'
// import { throttle } from 'throttle-debounce';
import { getOsInfo } from '../utils/os';

const name = getOsInfo().name;
const isMac = name === 'Mac';

// 按键状态
const keyStatus = isMac ? {
  c: 'c',
  z: 'z'
} : {
  c: 'c',
  z: 'z',
  y: 'y'
};
function isPreventDom (nodeName) {
  return /(INPUT)|(TEXTAREA)/.test(nodeName);
}
// 阻止执行
function isPreventExec (e) {
  return isPreventDom(e.target.nodeName);
}

// 退一步
function undo (e) {
  vm.emit('undo', e);
};
// 前一步
function redo (e) {
  vm.emit('redo', e);
};

const nativeEvents = ['copy', 'cut', 'paste', 'selectall'];

function nativeEmit (e, name) {
  vm.emit(name, e);
};

function macDispatch (e) {
  const { z } = keyStatus;

  if (e.metaKey && e.shiftKey && e.key === z) {
    redo(e);
  } else if (e.metaKey && e.key === z) {
    undo(e);
  }
}

function winDispatch (e) {
  const { y, z } = keyStatus;

  if (e.ctrlKey && e.key === y) {
    redo();
  } else if (e.ctrlKey && e.key === z) {
    undo();
  }
}

let vm = null
let isOpen = true

function KeyMapsEvents () {
  if (vm) {
    return console.error('key maps listner has already registered');
  }
  // 定义事件中心
  vm = new EventEmitter();
  // 关闭监听
  vm.close = function () {
    isOpen = false;
  };
  // 开启监听
  vm.open = function () {
    isOpen = true;
  };

  // 根据不同平台提供不同执行函数
  const keydownDispatch = isMac ? macDispatch : winDispatch;
  // 事件触发节流处理
  // const dispatchFn = throttle(time, keydownDispatch);
  // const dispatchFn = keydownDispatch;

  const wrapperFunc = (func, name) => {
    return e => {
      // 阻止事件
      if (!isOpen || isPreventExec(e)) {
        return;
      }
      func(e, name);
    }
  }

  const keydownFunc = wrapperFunc(e => {
    keydownDispatch(e);
  });
  /* 键盘按下事件 */
  window.addEventListener('keydown', keydownFunc);

  nativeEvents.forEach(name => {
    window.addEventListener(name, wrapperFunc(nativeEmit, name));
  })
  return vm;
}

export default KeyMapsEvents;
