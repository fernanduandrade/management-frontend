<template>
  <main class="wrapper">
    <div
      v-for="(n, index) in 10"
      :key="index"
    >
      <Order />
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  height: auto;
}
</style>
