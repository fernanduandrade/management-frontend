<script lang="ts" setup>
import OrderApi from '~/api/Order/OrderApi'

const modal = useModal()
async function deleteOrder() {
  modal.closeModal()
}
</script>

<template>
  <main class="container">
    <div class="self-center flex justify-between gap-4">
      <VButton :transparent="true" @click="modal.closeModal">
        Cancelar
      </VButton>
      <VButton>
        Excluir?
      </VButton>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 600px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
</style>
