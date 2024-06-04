<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import OrderForm from '~/orders/components/OrderForm.vue'
import OrderApi from '~/api/Order/OrderApi'
import { OrderDto, OrderStatus } from '~/orders/types'
import OrderDeleteForm from '~/orders/components/OrderDeleteForm.vue'
const modal = useModal()
const toast = useToast()
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
const ids = ref<string[]>([])

const { search, data } = useFilter(orders, 'clientName')

function createOrderModal() {
  modal.open({ component: markRaw(OrderForm), title: 'Cadastro de pedido' })
}

const onDeleteSub = ref('')

function deleteOrdersModal() {
  if (!ids.value.length) {
    toast.info('Nenhum registro selecionado')
    return
  }
  onDeleteSub.value = uuidv4()
  modal.open({
    component: markRaw(OrderDeleteForm),
    props: { ids: ids.value },
    title: 'Exclusão de pedidos',
    description: 'Você irá excluir todos os pedidos selecionados.',
    subscribe: onDeleteSub.value,
  })
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

const { modalEmitValue } = storeToRefs(modal)

watch(modalEmitValue, async(newValue) => {
  if (newValue === onDeleteSub.value) {
    await getOrders(10, 1)
    ids.value = []
  }
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

function onSelectId(evt: string[]) {
  ids.value = evt
}
</script>

<template>
  <main class="container shadow-md">
    <div class="order__actions">
      <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
      <div class="order__status">
        <span
          class="order__status__item"
          :class="{ active: currentStatus === 'TODOS' }"
          @click="filterByStatus('TODOS')"
        >TODOS</span>
        <span
          class="order__status__item"
          :class="{ active: currentStatus === 'ABERTO' }"
          @click="filterByStatus('ABERTO')"
        >ABERTO</span>
        <span
          class="order__status__item"
          :class="{ active: currentStatus === 'FECHADO' }"
          @click="filterByStatus('FECHADO')"
        >FECHADO</span>
      </div>
      <VButton :transparent="true" :outline="true" @click="deleteOrdersModal">
        Deletar pedido(s)
      </VButton>
      <VButton @click="createOrderModal">
        Novo pedido
      </VButton>
    </div>
    <VTable :columns="orderColumns" :data="data" page="orders" @select-ids="onSelectId">
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
