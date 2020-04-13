
function InstallMouseMapsEvents () {
  let open = true; // 是否开启监听
  return function (Vue, options = { open: true }) {
    open = options.open; // 是否开启监听
    // 定义事件中心
    const vm = new Vue();
    Vue.mousemaps = vm;
    Vue.prototype.$mousemaps = vm;

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
      vm.$emit('click-win', e);
    });
  };
}

export default {
  install: InstallMouseMapsEvents()
};
