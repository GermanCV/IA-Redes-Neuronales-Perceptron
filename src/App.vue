<template lang='pug'>
  div.app-container
    header.app__header
      h1  Inteligencia artificial
    aside.app-menu
      Menu
    main.app-main
      router-view
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'app',
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
  @import './assets/css/variables.css';
  body,* {
  margin: 0;
  box-sizing: border-box;
  }
  .app-container {
    background: #eeeeee;
    display: grid;
    height: 100vh;
    grid-auto-rows: 60px auto;
    grid-auto-columns: 250px  auto auto;
    grid-template-areas: "header header header" "aside main main";
    .app__header {
      grid-area: header;
      position: fixed;
      height: 60px;
      width: 100%;
      background: var(--primary-color-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--primary-color-text);
    }
    .app-menu {
      grid-area: aside;
    }
    .app-main {
      grid-area: main;
      margin: 20px;
      padding: 20px;
      background: #ffffff;
    }
  }
  
</style>
