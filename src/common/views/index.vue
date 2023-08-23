<script lang="ts" setup>
import SideNav from '~/common/components/SideNav/sidenav.vue'
</script>

<template>
  <main>
    <SideNav />
    <main id="mainContent" class="main-content">
      <router-view />
    </main>
  </main>
</template>

<style scoped>
.main-content {
  margin-left: 250px;
  padding: 20px;
}

.content-section {
  display: block;
}
</style>
