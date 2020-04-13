<script>
import { mapState, mapActions } from 'vuex';
import eventBus from '@/components/chart/EventBus';

import ColorPicker from '@/components/ColorPicker/index';

// 单次节流
function throttle(delayTime, fn) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    timer = null;

    timer = setTimeout(function() {
      fn.apply(this, args);
    }, delayTime);
  };
}
// 移除非数字字符
function replaceNumber(str) {
  let result = str.replace(/!\d/g, '') || 0;
  return parseInt(result);
}

export default {
  components: {
    ColorPicker,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  computed: {
    ...mapState({
      title: state => state.items['genre*sold'].title,
      size: state => state.items['genre*sold'].size,
      color: state => state.items['genre*sold'].color,
    }),
  },
  watch: {
    title(val) {
      this.updateTitle(val);
    },
  },
  methods: {
    ...mapActions(['saveData']),
    // 重绘图表 - 根据状态值标题重绘
    repaintTitle() {
      this.updateTitle(this.title);
    },
    // 修改标题(临时)
    saveTitleTemp() {
      return throttle(200, e => {
        let newTitle = e.target.value;

        eventBus.$emit('modify-temp', {
          title: newTitle,
        });
        this.updateTitle(newTitle);
      });
    },
    // 修改标题
    saveTitleConfirm() {
      return throttle(200, e => {
        let newTitle = e.target.value;

        this.saveData({
          name: 'genre*sold',
          key: 'title',
          data: newTitle,
        });
      });
    },
    // 重置标题
    resetTitle() {
      return throttle(100, e => {
        let title = this.title;

        eventBus.$emit('modify-temp', { title, });
        this.updateTitle(title);
      });
    },
    updateTitle(title) {
      this.form.setFieldsValue({
        title,
      });
    },
    saveSizeTemp() {
      return throttle(1000, e => {
        this.saveSizeConfirm(e);
      });
    },
    saveSize() {
      return throttle(100, e => {
        this.saveSizeConfirm(e, true);
      });
    },
    resetSize() {
      return throttle(100, e => {
        let size = { ...this.size };
        eventBus.$emit('modify-temp', { size, });
      });
    },
    saveSizeConfirm(e, isSave = false) {
      let mod = e.target.name;
      let another = mod == 'w' ? 'h' : 'w';
      let size = {
        [mod]: replaceNumber(e.target.value),
        [another]: this.size[another],
      };
      if (isSave) {
        this.emitData({
          key: 'size',
          data: size,
        })
      } else {
        eventBus.$emit('modify-temp', { size, });
      }
    },
    saveColorConfirm() {
      return throttle(100, val => {
        this.emitData({
          name: 'genre*sold',
          key: 'color',
          data: [{
            hex: val.hex,
            a: val.a,
          }],
        });
      });
    },
    emitData({ key, data }) {
      this.saveData({
        name: 'genre*sold',
        key,
        data,
      });
    },
  },
  render(h) {
    return (
      <div
        style={{
          padding: '30px 0',
        }}
      >
        <a-form
          form={this.form}
          label-col={{ span: 6 }}
          wrapper-col={{ span: 16 }}
        >
          <a-form-item label="标题">
            <a-input
              size="small"
              onPressEnter={this.saveTitleConfirm()}
              onChange={this.saveTitleTemp()}
              onBlur={this.resetTitle()}
              v-decorator={[
                'title',
                {
                  initialValue: this.title,
                  rules: [{ message: 'Please input your note!' }],
                },
              ]}
            />
          </a-form-item>
          <a-form-item label="宽度">
            <a-input
              name="w"
              size="small"
              onPressEnter={this.saveSize()}
              onChange={this.saveSizeTemp()}
              onBlur={this.resetSize()}
              v-decorator={[
                'width',
                {
                  initialValue: this.size.w,
                  rules: [{ message: 'Please input your note!' }],
                },
              ]}
            />
          </a-form-item>
          <a-form-item label="高度">
            <a-input
              name="h"
              size="small"
              onPressEnter={this.saveSize()}
              onChange={this.saveSizeTemp()}
              onBlur={this.resetSize()}
              v-decorator={[
                'height',
                {
                  initialValue: this.size.h,
                  rules: [{ message: 'Please input your note!' }],
                },
              ]}
            />
          </a-form-item>
          <a-form-item label="颜色">
            <color-picker
              value={{
                hex: this.color[0].hex,
                a: this.color[0].a,
              }}
              onChange={this.saveColorConfirm()}
            ></color-picker>
          </a-form-item>
        </a-form>
      </div>
    );
  },
};
</script>