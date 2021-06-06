<template>
  <div class="nav">
    <a href="https://igloo.energy/" target="_blank" title="Igloo Energy" class="nav__logo">
      <Logo />
    </a>
  </div>
</template>

<script>
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>

<style>
.nav {
  height: 67px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #ff0099;
}

.nav__logo {
  display: flex;
}
</style>
