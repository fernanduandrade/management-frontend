<script lang="ts" setup>
import useModal from '~/common/logic/use-modal'
import OrderForm from '~/orders/components/OrderForm.vue'
import OrderApi from '~/api/Order/OrderApi'
import { OrderDto, OrderStatus } from '~/orders/types'
const storeModal = useModal()

const orders = ref<OrderDto[]>()
const currentPage = ref(1)
const currentStatus = ref<OrderStatus>('ABERTO')
const hasNextPage = ref(false)
const hasPreviousPage = ref(false)
const totalPages = ref(0)
function createOrderModal() {
  storeModal.openModal({ component: markRaw(OrderForm) })
}

onMounted(async() => {
  const response = await OrderApi.getOrderStatusPaginated({ pageNumber: 1, pageSize: 10, status: currentStatus.value })
  orders.value = response.data.items
  hasPreviousPage.value = response.data.hasPreviousPage
  hasNextPage.value = response.data.hasNextPage
  totalPages.value = response.data.totalPages
})

async function filterByStatus(status: OrderStatus, page: number) {
  if (currentStatus.value !== status)
    page = 1
  currentStatus.value = status
  const response = await OrderApi.getOrderStatusPaginated({ pageNumber: page, pageSize: 10, status: currentStatus.value })
  orders.value = response.data.items
  hasPreviousPage.value = response.data.hasPreviousPage
  hasNextPage.value = response.data.hasNextPage
  totalPages.value = response.data.totalPages
}
</script>

<template>
  <main class="wrapper">
    <div class="order__actions">
      <div class="order__status">
        <span
          class="order__status__item"
          :class="{active : currentStatus === 'ABERTO'}"
          @click="filterByStatus('ABERTO', currentPage)"
        >ABERTO</span>
        <span
          class="order__status__item"
          :class="{active : currentStatus === 'FECHADO'}"
          @click="filterByStatus('FECHADO', currentPage)"
        >FECHADO</span>
      </div>
      <VButton @click="createOrderModal">
        Novo pedido
      </VButton>
    </div>
    <div class="order">
      <div v-for="order in orders" :key="order.id">
        <Order :order="order" />
      </div>
    </div>
    <Pagination
      :has-next-page="hasNextPage"
      :has-previous-page="hasPreviousPage"
      :current-page="currentPage"
      :total-page="totalPages"
      @change-page="filterByStatus(currentStatus, $event)"
      @update-current-page="currentPage = $event"
    />
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
  align-items: center;
}

.order__status {
  background-color: #F1F5F9;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}

.order__status .active {
  font-weight: 500;
  color: black;
  background-color: #FFFFFF;
  display: block;
}

.order__status__item {
  font-weight: 500;
  color: #64748b;
  transition: all .2s ease-in;
  display: block;
  border-radius: 9px;
  padding: 5px;
  cursor: pointer;
}

.order__status__item:not(.active):hover {
  color: #333;
}
</style>
