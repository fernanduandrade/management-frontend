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
    <Transition>
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
.v-enteder-from,
.v-enter-to {
  opacity: 0;
}

.v-enter-active,
.v-leaver-active {
  transition: 0.25s ease all;
}

.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
}
</style>
