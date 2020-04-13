<script>
import { Sketch } from 'vue-color';

export default {
  name: 'ColorPicker',
  components: {
    SketchPicker: Sketch,
  },
  props: {
    value: Object,
    model: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      show: false,
    }
  },
  mounted () {
    this.$mousemaps.$on('click-win', this.close);
  },
  beforeDestroy () {
    this.$mousemaps.$off('click-win', this.close);
  },
  methods: {
    open (e) {
      e.stopPropagation();
      this.switch(true);
    },
    close () {
      this.switch(false);
    },
    switch (show) {
      this.show = show;
    },
    updateValue (data) {
      this.$emit('change', data);
    },
  },
  render(h) {
    return <div class="s-color-picker">
      <div
        class="s-color-block"
        style={{
          backgroundColor: this.value.hex,
        }}
        onClick={this.open}
      >
        {
          this.show ? <div class="s-color-sketch-wrapper">
            <sketch-picker
              value={this.value}
              onInput={this.updateValue}
            ></sketch-picker>
          </div> : null
        }
      </div>
    </div>;
  }
}
</script>

<style lang="less">
  .s-color-picker {
    line-height: 36px;
    .vc-sketch-field {
      line-height: 1;
    }
    .vc-sketch-presets {
      line-height: 1;
    }
    .s-color-block {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      height: 22px;
      border-radius: 3px;
    }
    .s-color-sketch-wrapper {
      position: absolute;
      top: 0;
      right: 100%;
      margin-right: 6px;
    }
  }
</style>