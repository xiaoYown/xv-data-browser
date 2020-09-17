import { Chart } from '@antv/g2';

class Column {
  $el = null // 挂载元素存储
  $root = null // 存储 chart 对象

  constructor (el, options) {
    this.$el = el;
    this.$options = options;
  }

  render (options) {
    const { data, configs } = options || this.$options;
    const { title, size, color, xField, yField } = configs;
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
      .position(`${xField}*${yField}`)
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
    options.configs.title = title;
    this.setView(options);
  }
  updateSize (size) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.configs.size = size;
    this.setView(options);
  }
  updateData (data) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.configs.data = data;
    this.setView(options);
  }
  updateColor (color) {
    const options = JSON.parse(JSON.stringify(this.$options));
    options.configs.color = color;
    this.setView(options);
  }
  destroy () {
    this.$root.destroy();
  }
}

export default function (el, options) {
  return new Column(el, options);
}
