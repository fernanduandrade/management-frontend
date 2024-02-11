<script lang="ts" setup>
import useModal from '~/common/logic/use-modal'
import OrderProductForm from '~/orders/components/OrderProductForm.vue'

const router = useRoute()
const orderId = ref('')
const modal = useModal()
function addProduct() {
  return modal.openModal({ component: markRaw(OrderProductForm) })
}

onMounted(async() => {
  orderId.value = router.params.id as string
})
</script>

<template>
  <main class="wrapper">
    <div class="order__actions">
      <VButton @click="addProduct">
        Incluir produto
      </VButton>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order__product {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
