<script>
import './App.less';

export default {
  name: 'App',
  render (h) {
    // <a-layout>
    //   <a-layout-header
    //     style={{
    //       backgroundColor: '#ffffff'
    //     }}
    //   >
    //     <div id="nav">
    //       <router-link to="/vue/home">Home</router-link> |&nbsp;
    //       <router-link to="/vue/home/about">About</router-link> |&nbsp;
    //       <router-link to="/vue/home/docs">Docs</router-link>
    //     </div>
    //   </a-layout-header>
    // </a-layout>
    return <div id="app">
      <router-view />
    </div>;
  }
};
</script>

<style scoped>
#app {
  height: 100%;
}
</style>>
