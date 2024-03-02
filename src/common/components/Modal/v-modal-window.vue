<script lang="ts" setup>
import useModalStore from '~/common/logic/use-modal'

const store = useModalStore()

function keyDownListener(event: KeyboardEvent) {
  if (event.key === 'Escape')
    store.closeModal()
}

onMounted(() => {
  document.addEventListener('keydown', keyDownListener)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyDownListener)
})

</script>

<template>
  <Teleport to="body">
    <Transition name="top-to-middle">
      <div
        v-if="store.modalState.component"
        class="modal-wrapper"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
        @click.self="store.closeModal"
      >
        <component
          :is="store.modalState.component"
          v-bind="store.modalState.props"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.top-to-middle-enter-active,
.top-to-middle-leave-active {
  transition: transform 0.5s;
}

.top-to-middle-enter-from,
.top-to-middle-leave-to {
  transform: translateY(-100%);
}

.top-to-middle-enter-to,
.top-to-middle-leave-from {
  transform: translateY(0);
}

.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
