<script lang="ts" setup>

const store = useModal()

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
    <Transition name="modal-appear">
      <div
        v-if="store.modalState.component"
        class="modal-wrapper"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
        @click.self="store.closeModal"
      >
        <div class="p-4 shadow-sm bg-white rounded-md flex flex-col gap-3">
          <header class="flex justify-between">
            <div class="self-center">
              <h4 class="font-bold text-[20px]">
                {{ store.modalState.title }}
              </h4>
              <span class="text-gray-600">
                {{ store.modalState.description ? store.modalState.description : 'Insira as informações para abaixo' }}
              </span>
            </div>
            <div
              class="hover:cursor-pointer rounded-full hover:bg-slate-200 w-[30px] h-[30px] flex justify-center items-center"
              @click="store.closeModal()"
            >
              <font-awesome-icon icon="fa-xmark" color="#858585" />
            </div>
          </header>
          <hr class="w-[100%]" />
          <component
            :is="store.modalState.component"
            v-bind="store.modalState.props"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-appear-active {
  transition: opacity 0.5s, transform 0.5s;
}

.modal-appear-from,
.modal-appear-to {
  opacity: 0;
  transform: scale(0);
}

.modal-appear-to {
  opacity: 1;
  transform: scale(1);
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
