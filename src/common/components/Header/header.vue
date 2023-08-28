<script lang="ts" setup>
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main id="container">
    <header class="header">
      <div>Usuário/{{ t(`pages.${router.currentRoute.value.name as string}`) }}</div>
      <div><h2>Gestão de produtos</h2></div>
      <div>pesquisar</div>
    </header>
  </main>
</template>

<style scoped>
#container {
  background-color: #F1F1F1;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

}
.header {
  padding: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
  width: 100%

}
</style>
