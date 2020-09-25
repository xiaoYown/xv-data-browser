import EventEmitter from 'eventemitter3'

let vm = null;
let open = false;

function MouseMapsEvents (options = { open: true }) {
  if (!vm) {
    open = options.open; // 是否开启监听
    vm = new EventEmitter();
  
    // 关闭监听
    vm.close = function () {
      open = false;
    };
    // 开启监听
    vm.open = function () {
      open = true;
    };
  
    window.addEventListener('click', e => {
      if (!open) {
        return;
      }
      vm.emit('click-window', e);
    });
  }
  return vm;
};

export default MouseMapsEvents;
