<script>
import { mapState, mapActions } from 'vuex';

import { clonePure } from '@/utils/util';
import Shadow from '@/components/Shadow';
import Container from '@/components/Container';
// import EditTable from './EditTable';
import Sider from './Sider/index';

// import keydownBroadcast from '@/core/events/key-maps';

// const ViewChart = () => import(/* webpackChunkName: "G2", webpackPrefetch: true */ './ViewChart');
const ChartEdit = () => import(/* webpackChunkName: "G2-edit", webpackPrefetch: true */ '@/components/chart/ViewEdit');
const EditTable = () => import(/* webpackChunkName: "handsontable", webpackPrefetch: true */ './EditTable');

const bgColor = '#FEFEFE';

export default {
  name: 'Home',
  components: {
    EditTable,
    's-shadow': Shadow,
    's-container': Container,
    's-sider': Sider,
    ChartEdit,
  },
  data() {
    return {
      chart: null, // 存放图表对象
      eidtStatus: 'panel', // 编辑状态 - panel: 面板数据 data: 编辑数据
    };
  },
  computed: {
    ...mapState({
      chartData: state => state.items['genre*sold'],
    }),
  },
  mounted() {
    this.$keymaps.$on('undo', this.undo);
    this.$keymaps.$on('redo', this.redo);
  },
  beforeDestroy() {
    this.$keymaps.$off('undo', this.undo);
    this.$keymaps.$off('redo', this.redo);
  },
  methods: {
    ...mapActions(['moveStep']),
    undo() {
      console.log('undo');
      this.moveStep({
        direction: -1,
        name: 'genre*sold',
      });
    },
    redo() {
      console.log('redo');
      this.moveStep({
        direction: 1,
        name: 'genre*sold',
      });
    },
  },
  render(h) {
    return (
      <div class="home">
        <a-layout
          layout="horizontal"
          style={{
            height: '100%',
          }}
        >
          <a-layout
            layout="vertical"
            style={{
              height: '100%',
            }}
          >
            <a-layout-content
              style={{
                position: 'relative',
                paddingTop: '80px',
                backgroundColor: bgColor,
              }}
            >
              <s-container>
                {
                  this.chartData ? <chart-edit chartData={this.chartData}></chart-edit> : null
                }
              </s-container>
            </a-layout-content>
            <a-layout-footer
              style={{
                position: 'relative',
                padding: 0,
                height: '260px',
                backgroundColor: bgColor,
              }}
            >
              <s-container clear={['top']}>
                {
                  this.chartData ? <edit-table
                    open={this.eidtStatus === 'data'}
                    onOpen={() => { this.eidtStatus = 'data'; }}
                    onClose={() => { this.eidtStatus = 'panel'; }}
                  ></edit-table> : null
                }
              </s-container>
            </a-layout-footer>
          </a-layout>
          <a-layout-sider
            style={{
              minWidth: '300px',
              backgroundColor: bgColor,
            }}
          >
            <s-container clear={['left']}>
              <s-sider></s-sider>
              <s-shadow vShow={this.eidtStatus !== 'panel'}></s-shadow>
            </s-container>
          </a-layout-sider>
        </a-layout>
      </div>
    );
  },
};
</script>

<style lang="less">
.home {
  height: 100%;
  .ant-form-item {
    margin-bottom: 8px;
  }
}
</style>
