<script lang="ts" setup>
import VInfoModalWindow from '../components/Modal/v-info-modal-window.vue'
import useModal from '../logic/use-modal'

const router = useRouter()
onMounted(() => router.push('products'))
const store = useModal()

const showSideNav = ref(true)
const changeSideNavState = (state: boolean) => {
  showSideNav.value = state
}

function openInfoModal() {
  store.openModal({ component: VInfoModalWindow })
}
</script>

<template>
  <main id="container">
    <Transition name="slide-fade" mode="out-in">
      <sidenav v-show="showSideNav" />
    </Transition>
    <div class="main-content">
      <Header @side-nav-event="changeSideNavState" />
      <div class="content">
        <button @click="openInfoModal">
          teste
        </button>
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
.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  background-color: #FFFFFF;
  padding: 2rem;
}
</style>
