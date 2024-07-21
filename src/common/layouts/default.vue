<script lang="ts" setup>
import TheSideNav from '../components/SideNav/TheSideNav.vue'

const router = useRouter()
const modal = useModal()
onMounted(() => router.push('dashboards'))

const cssClasses = computed(() => {
  const classes = {
    'open-modal': modal.modalState.opened,
  }

  return classes
})
</script>

<template>
  <main id="container" :class="[cssClasses]">
    <TheSideNav />
    <div class="main-content">
      <TheHeader />
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.content {
  background-color: #F6F7FB;
  padding: 2rem;
  height: 100%;
}
</style>
