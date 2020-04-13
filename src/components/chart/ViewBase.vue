<script>
import { Chart } from '@antv/g2';
import { Bar } from '@/core/chart';
import { throttle, } from 'throttle-debounce';

const ViewBase = {
  props: {
    chartData: Object,
  },
  data () {
    return {
      chart: null,
      size: null
    }
  },
  created () {
    this.size = this.chartData.size;
  },
  mounted () {
    this.paint();
    window.addEventListener('resize', this.repaint);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.repaint);
  },
  methods: {
    paint() {
      this.chart = new Bar('c1', this.chartData);
      this.chart.render();
    },
    repaint() {
      clearTimeout(this.repainter);
      this.repainter = null;

      this.repainter = setTimeout(() => {
        this.chart.resetView();
      }, 500);
    },
  },
  render(h) {
    const size = this.size;

    return <div class="wrapper">
      <div class="cell">
        <div
          class="inner"
          style={{
            width: `${size.w}px`,
            height: `${size.h}px`,
          }}
        >
          <div
            id="c1"
            class="m-ChartWrapper"
          ></div>
        </div>
      </div>
    </div>
  },
};

export default ViewBase;

</script>

<style scoped>
  .m-ChartWrapper {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
    border-radius: 3px;
  }
  .wrapper {
    display: table;
    width: 100%;
    height: 100%;
  }
  .cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .inner {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
</style>