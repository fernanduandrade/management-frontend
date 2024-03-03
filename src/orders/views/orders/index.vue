<script lang="ts" setup>
import OrderForm from '~/orders/components/OrderForm.vue'
import OrderApi from '~/api/Order/OrderApi'
import { OrderDto, OrderStatus } from '~/orders/types'
const storeModal = useModal()

const orderColumns = ref<string[]>([
  'clientName', 'date', 'status',
])

const orders = ref<OrderDto[]>([])
const currentPage = ref(1)
const currentPageSize = ref(10)
const currentStatus = ref<OrderStatus>('TODOS')
const pageSize = ref(10)
const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const totalPages = ref(0)
const totalCount = ref(0)

const { search, data } = useFilter(orders, 'clientName')

function createOrderModal() {
  storeModal.openModal({ component: markRaw(OrderForm), title: 'Cadastro de pedido' })
}

async function getOrders(pageSize: number, pageNumber: number) {
  const { data } = await OrderApi.getOrderStatusPaginated({ pageNumber, pageSize, status: currentStatus.value })
  orders.value = data.items
  hasPreviousPage.value = data.hasPreviousPage
  hasNextPage.value = data.hasNextPage
  totalPages.value = data.totalPages
  totalCount.value = data.totalCount
}

onMounted(async() => {
  await getOrders(10, 1)
})

async function changeOrderPage(evt: any) {
  currentPage.value = evt.pageNumber
  currentPageSize.value = evt.pageSize
  await getOrders(evt.pageSize, evt.pageNumber)
}

async function filterByStatus(status: OrderStatus) {
  orders.value = orders.value = []

  if (currentStatus.value !== status) {
    currentPage.value = 1
    currentPageSize.value = 10
  }

  currentStatus.value = status
  await getOrders(currentPageSize.value, currentPage.value)
}
</script>

<template>
  <main class="container shadow-md">
    <div class="order__actions">
      <div class="order__status">
        <span
          class="order__status__item"
          :class="{active : currentStatus === 'TODOS'}"
          @click="filterByStatus('TODOS')"
        >TODOS</span>
        <span
          class="order__status__item"
          :class="{active : currentStatus === 'ABERTO'}"
          @click="filterByStatus('ABERTO')"
        >ABERTO</span>
        <span
          class="order__status__item"
          :class="{active : currentStatus === 'FECHADO'}"
          @click="filterByStatus('FECHADO')"
        >FECHADO</span>
      </div>
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <VButton @click="createOrderModal">
        Novo pedido
      </VButton>
    </div>
    <VTable
      :columns="orderColumns"
      :data="data"
      page="orders"
    >
    </VTable>
    <Pagination
      :total-count="totalCount"
      :total-pages="totalPages"
      :page-number="currentPage"
      :page-size="pageSize"
      @update-page="changeOrderPage"
    />
  </main>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background-color-primary);
  border-radius: 10px;
  padding: 1.5rem;
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
