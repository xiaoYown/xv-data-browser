import EventEmitter from 'eventemitter3'
import { throttle } from 'throttle-debounce';
import { getOsInfo } from '../utils/os';

const name = getOsInfo().name;
const isMac = name === 'Mac';

// 按键状态
const keyStatus = isMac ? {
  z: 'z'
} : {
  z: 'z',
  y: 'y'
};
// 是否为监听的 key
function hasListen (key) {
  return typeof keyStatus[key] !== 'undefined';
}
function isPreventDom (nodeName) {
  return /(INPUT)|(TEXTAREA)/.test(nodeName);
}
// 阻止执行
function isPreventExec (key, nodeName) {
  return !hasListen(key) || isPreventDom(nodeName);
}

function KeyMapsEvents (options = { open: true, time: 300 }) {
  let { open, time } = options;
  // 定义事件中心
  const vm = new EventEmitter();
  // 关闭监听
  vm.close = function () {
    open = false;
  };
  // 开启监听
  vm.open = function () {
    open = true;
  };
  // 退一步
  function undo (e) {
    vm.emit('undo', e);
  };
  // 前一步
  function redo (e) {
    vm.emit('redo', e);
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
  // 根据不同平台提供不同执行函数
  const keydownDispatch = isMac ? macDispatch : winDispatch;
  // 事件触发节流处理
  const dispatchFn = throttle(time, keydownDispatch);

  window.addEventListener('keydown', e => {
    if (!open) {
      return;
    }
    // 阻止执行事件
    if (isPreventExec(e.key, e.target.nodeName)) {
      return;
    }
    e.preventDefault();

    dispatchFn(e);
  });
  return vm;
}

export default KeyMapsEvents;
