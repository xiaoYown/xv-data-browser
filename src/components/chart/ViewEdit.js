import Base from './ViewBase';
import eventBus from './EventBus';

const ViewEdit = {
  extends: Base,
  watch: {
    // 'chartData.title' (val, oldVal) {
    //   if (val !== oldVal) {
    //     this.viewTitle = val;
    //     this.chart.destroy();
    //     this.paint();
    //   }
    // },
    // 'chartData.data' (val, oldVal) {
    //   if (JSON.stringify(val !== JSON.stringify(oldVal))) {
    //     this.updateData(val);
    //   }
    // },
    'chartData.color' (val, oldVal) {
      if (JSON.stringify(val !== JSON.stringify(oldVal))) {
        this.chart.updateColor(val);
      }
    },
    // 'chartData.size' (val, oldVal) {
    //   if (JSON.stringify(val !== JSON.stringify(oldVal))) {
    //     this.size = val;
    //   }
    // },
    size: {
      deep: true,
      handler (val, oldVal) {
        if (
          !this.chart ||
          oldVal === null ||
          (val.w === oldVal.w && val.h === oldVal.h) ||
          !val.w ||
          !val.h
        ) {
          return;
        }
        setTimeout(() => {
          this.chart.updateSize(val);
        }, 0);
      }
    }
  },
  mounted () {
    eventBus.$on('modify-temp', this.updateTemp);
  },
  beforeDestroy () {
    eventBus.$off('modify-temp', this.updateTemp);
  },
  methods: {
    // 临时更新视图, 非状态修改
    updateTemp (param) {
      console.log(param);
      if (typeof param.title !== 'undefined') {
        this.updateTitle(param.title);
      }
      if (typeof param.size !== 'undefined') {
        this.size = param.size;
      }
      if (typeof param.data !== 'undefined') {
        this.updateData(param.data);
      }
    },
    updateTitle (title) {
      this.chart.updateTitle(title);
    },
    updateData (data) {
      this.chart.updateData(data);
    },
    updateColor (color) {
      this.chart.updateColor(color);
    }
  }
};

export default ViewEdit;
