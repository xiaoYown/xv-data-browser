<script>
export default {
  props: {
    clear: Array,
  },
  render(h) {
    const style = {};
    const clear = this.clear || [];
  
    if (~clear.indexOf('top')) {
      style.top = 0;
    }
    if (~clear.indexOf('right')) {
      style.right = 0;
    }
    if (~clear.indexOf('bottom')) {
      style.bottom = 0;
    }
    if (~clear.indexOf('left')) {
      style.left = 0;
    }

    return (
      <div class="container" style={style}>
        {this.$slots.default}
      </div>
    );
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 14px;
  right: 14px;
  bottom: 14px;
  left: 14px;
  background-color: #FFFFFF;
  box-shadow: -1px 0 5px 0 rgba(0,0,0,.1);
}
</style>