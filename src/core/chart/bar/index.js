import { Chart } from '@antv/g2';

class Bar {
  $el = null // 挂载元素存储
  $root = null // 存储 chart 对象

  constructor (el, options) {
    this.$el = el;
    this.$options = options;
  }

  render (options) {
    const { title, size, color, data } = options || this.$options;
    // 创建 Chart 对象
    this.$root = new Chart({
      container: this.$el, // 指定图表容器 ID
      autoFit: true,
      width: size.w, // 指定图表宽度
      height: size.h, // 指定图表高度
      padding: [60, 60, 60, 60],
      data
    });

    this.$root.tooltip({
      // shared: true,
      showMarkers: false
    });

    this.$root.interaction('active-region');

    // 创建图形语法，绘制柱状图
    this.$root
      .interval()
      .position('genre*sold')
      .color('type', () => {
        return color[0].hex;
      });
    // 载入数据源
    this.$root.data(data);
    // 关闭动画
    this.$root.animate(false);
    // 标题绘制
    const offsetY = -(size.h - 60 - 60);
    this.$root.annotation().text({
      content: title,
      // offsetX: 0,
      offsetY,
      top: true
    });
    // 渲染图表
    this.$root.render();
  }

  // 重置视图
  resetView () {
    this.$root.destroy();
    this.render(this.options);
  }

  // TODO: 以下为临时修改方法, 后期可能做统一处理
  setView (options) {
    this.$root.destroy();
    this.render(options);
  }
  updateTitle (title) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.title = title;
    this.setView(options);
  }
  updateSize (size) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.size = size;
    this.setView(options);
  }
  updateData (data) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.data = data;
    this.setView(options);
  }
  updateColor (color) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.color = color;
    this.setView(options);
  }
}

export default function (el, options) {
  return new Bar(el, options);
}
