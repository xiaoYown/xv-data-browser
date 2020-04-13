<script>
import { mapState, mapActions } from 'vuex';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import eventBus from '@/components/chart/EventBus';

import Shadow from '@/components/Shadow';

export default {
  name: 'EditTable',
  components: {
    's-shadow': Shadow,
  },
  props: {
    open: Boolean,
  },
  computed: {
    ...mapState({
      chartData: state => state.items['genre*sold'].data,
      data: state => {
        return state.items['genre*sold'].data.map(item => {
          return [item.genre, item.sold];
        });
      },
    }),
  },
  mounted() {
    let el = document.getElementById('handsontable-wrap');
    const hot = new Handsontable(el, {
      data: this.data,
      // rowHeaders: true,
      // colHeaders: true,
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: (change, source) => {
        if (source === 'loadData') {
          return;
        }
        this.modifyData(true, hot.getData());
      },
    });
    this.hotTable = hot;
  },
  watch: {
    data(val) {
      this.hotTable.loadData(val);
    },
  },
  methods: {
    ...mapActions(['saveData']),
    openSwitch(open) {
      this.$emit('open');
    },
    modifyConfirm() {
      this.modifyData(false, this.hotTable.getData());
    },
    modifyReset() {
      this.hotTable.loadData(this.data);
      this.$emit('close');
      eventBus.$emit('modify-temp', {
        data: this.chartData,
      });
    },
    /**
     * @param {boolean} temp - 是否临时修改
     * @param {object} data - 修改的数据
     */
    modifyData(temp, data) {
      let newData = data.map(item => {
        return {
          genre: item[0],
          sold: parseInt(item[1]),
        };
      });
      if (temp) {
        eventBus.$emit('modify-temp', {
          data: newData,
        });
        return;
      }
      if (JSON.stringify(newData) === JSON.stringify(this.chartData.data))
        return;

      this.$emit('close');

      this.saveData({
        name: 'genre*sold',
        key: 'data',
        data: newData,
      });
    },
  },
  render(h) {
    const { open } = this;
    return (
      <div
        class="table"
        style={{
          overflowY: open ? 'auto' : 'hidden',
        }}
      >
        <div id="handsontable-wrap"></div>
        <div class="operation">
          <div class="wrapper">
            <a-button type="primary" onClick={this.modifyConfirm}>
              确认
            </a-button>
            <a-button onClick={this.modifyReset}>取消</a-button>
          </div>
        </div>
        <s-shadow vShow={!this.open}>
          <div
            style={{
              float: 'right',
              padding: '10px',
            }}
          >
            <a-button type="primary" onClick={this.openSwitch}>
              编辑数据
            </a-button>
          </div>
        </s-shadow>
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.table {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;

  .operation {
    height: 60px;
    .wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 60px;
      text-align: right;
      line-height: 60px;
    }
    .ant-btn {
      margin-right: 6px;
    }
  }
}
</style>