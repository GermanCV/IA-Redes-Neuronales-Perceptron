<template lang="pug">
  nav.main-nav
    div.main-logo-container
      img.main__logo(src="")
    ul.main-nav-list
      li.main-nav-list__item(v-for="item in menu" :key="item.id")
        router-link.list__link(:to="item.path") 
          i.material-icons.list__icon {{item.icon}}
          span.list__text {{item.name}}
</template>

<script>
  export default {
    data: () => ({
      menu: [
        { path: '/', name: 'Home', icon: 'home' },
        { path: '/perceptron', name: 'Perceptron - E1', icon: 'accessibility' },
        { path: '/perceptron-and', name: 'Perceptron - AND', icon: 'accessibility' },
        { path: '/app/report', name: 'Algoritmo 2', icon: 'history' },
        { path: '/app/branch-office', name: 'Algoritmo 3', icon: 'list' },
        { path: '/app/setting', name: 'Algoritmo 4', icon: 'phone' },
        { path: '/login', name: 'salir', icon: 'power_settings_new' },
      ],
    }),
  };
</script>

<style scoped lang="scss">
  .main-logo-container {
    box-shadow:  rgba(0, 0, 0, .16) 0 3px 6px 0;
    margin: 10px;
    .main__logo {
      width: 220px;
      display: block;
    }
  }
  .main-nav {
    background: #F2F2F2;
    .main-nav-list {
      list-style: none;
      padding-left: 0;
      .router-link-exact-active {
        background: rgba(0, 0, 0, .1);;
      }
      .list__link {
        text-decoration: none;
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        &:hover {
          background: rgba(0, 0, 0, .1);
          cursor: pointer;
        }
        .list__icon, .list__text {
          margin-left: 10px;
          color: #636363;
        }
        .list__text {
          margin-left: 25px;
        }
      }
    }
  }
  
</style>