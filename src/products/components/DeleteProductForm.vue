<script lang="ts" setup>
import { PropType } from 'vue'
import ProductApi from '~/api/Product/ProductApi'

const props = defineProps({
  ids: {
    type: Object as PropType<string[]>,
    required: true,
  },
})

const modal = useModal()
async function deleteProduct() {
  await ProductApi.deleteBulk({ ids: props.ids })
  modal.close()
}
</script>

<template>
  <main class="container">
    <span class="self-center text-lg">Deseja excluir todos os <strong>{{ ids.length }}</strong> registros selecionados?</span>
    <div class="self-center flex justify-between gap-4">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="deleteProduct">
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
