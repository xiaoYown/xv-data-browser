import EventEmitter from 'eventemitter3'

let vm = null;
let isOpen = true;

function MouseMapsEvents () {
  if (!vm) {
    vm = new EventEmitter();
  
    // 关闭监听
    vm.close = function () {
      isOpen = false;
    };
    // 开启监听
    vm.open = function () {
      isOpen = true;
    };
  
    window.addEventListener('click', e => {
      if (!isOpen) {
        return;
      }
      vm.emit('click-window', e);
    });
  }
  return vm;
};

export default MouseMapsEvents;
