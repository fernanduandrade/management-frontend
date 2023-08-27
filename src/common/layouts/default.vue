<script lang="ts" setup>
</script>

<template>
  <main id="container">
    <sidenav />
    <div class="main-content">
      <Header />
      <div><router-view /></div>
    </div>
  </main>
</template>

<style>
#container {
  display: flex;
}
.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

</style>
