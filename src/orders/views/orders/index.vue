<script lang="ts" setup>
import useModal from '~/common/logic/use-modal'
import OrderForm from '~/orders/components/OrderForm.vue'
import OrderApi from '~/api/Order/OrderApi'
import { OrderDto } from '~/orders/types'
const storeModal = useModal()

const orders = ref<OrderDto[]>()

function createOrderModal() {
  storeModal.openModal({ component: markRaw(OrderForm) })
}

onMounted(async() => {
  const response = await OrderApi.getOrderStatusPaginated({ pageNumber: 1, pageSize: 10, status: 'ABERTO' })
  orders.value = response.data.items
})
</script>

<template>
  <main class="wrapper">
    <div class="order__actions">
      <VButton @click="createOrderModal">
        Novo pedido
      </VButton>
    </div>
    <div class="order">
      <div v-for="order in orders" :key="order.id">
        <Order :order="order" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.order__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
