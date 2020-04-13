<script>
export default {
  render(h) {
    return (
      <div class="shadow">
        {this.$slots.default}
        <icon-self
          type="anticon-lock"
          class="lock"
          style={{
            padding: '6px',
            fontSize: '30px',
            color: '#FFFFFF',
          }}
        ></icon-self>
      </div>
    );
  },
};
</script>

<style scoped>
.shadow {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.lock {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -23px;
  margin-left: -23px;
}
</style>