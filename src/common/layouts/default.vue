<script lang="ts" setup>
const router = useRouter()
onMounted(() => router.push('products'))

const showSideNav = ref(true)
const changeSideNavState = (state: boolean) => {
  showSideNav.value = state
}
</script>

<template>
  <main id="container">
    <Transition>
      <sidenav v-show="showSideNav" />
    </Transition>
    <div class="main-content">
      <Header @side-nav-event="changeSideNavState" />
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

.v-enter-active {
  animation: leave-in 0.1s;
}
.v-leave-active {
  animation: leave-in 0.1s reverse;
}

@keyframes leave-in {
  100% {
    transform: translateX(-20px);
  }
}
</style>
