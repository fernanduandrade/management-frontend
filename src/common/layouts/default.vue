<script lang="ts" setup>
</script>

<template>
  <main id="container">
    <SideNav />
    <div class="main-content">
      <Header />
      <div><h1>conteudo das páginas</h1></div>
    </div>
  </main>
</template>

<style>
#container {
  display: flex;
  flex-direction: column;
}
.main-content {
  padding: 20px;
}

</style>
