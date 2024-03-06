<script lang="ts" setup>
import TheSideNav from '../components/SideNav/TheSideNav.vue'

const router = useRouter()
const modal = useModal()
onMounted(() => router.push('dashboards'))

const showSideNav = ref(true)
const changeSideNavState = (state: boolean) => {
  showSideNav.value = state
}

const cssClasses = computed(() => {
  const classes = {
    'open-modal': modal.modalState.opened,
  }

  return classes
})
</script>

<template>
  <main id="container" :class="[cssClasses]">
    <Transition name="slide-fade" mode="out-in">
      <TheSideNav v-show="showSideNav" />
    </Transition>
    <div class="main-content">
      <TheHeader @side-nav-event="changeSideNavState" />
      <div class="content">
        <router-view />
        <VModalWindow />
      </div>
    </div>
  </main>
</template>

<style>
#container {
  display: flex;
}
.open-modal {
  filter: blur(4px);
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.content {
  background-color: #F9FAFE;
  padding: 2rem;
  height: 100%;
}
</style>
