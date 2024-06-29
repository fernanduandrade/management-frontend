<script lang="ts" setup>
const router = useRouter()
const { t } = useI18n()

</script>

<template>
  <main id="container">
    <header class="header">
      <div class="header__content">
        <h1 class="text-[25px] font-bold">
          {{ t(`pages.${router.currentRoute.value.name as string}`) }}
        </h1>
      </div>
      <!-- <h1>user vai aqui</h1> -->
    </header>
  </main>
</template>

<style scoped>
#container {
  background-color: #FFFFFF;
  border-bottom: var(--accent-color) 1px solid;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.header {
  padding: 2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.header__content {
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
