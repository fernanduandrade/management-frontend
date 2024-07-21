<script lang="ts" setup>
import OrderApi from '~/api/Order/OrderApi'
import SaleApi from '~/api/Sale/SaleApi'
import { formatCurrency, useOdometer } from '~/common/logic'

const todaySales = ref(0)
const monthSales = ref(0)

const totalOrder = ref(0)
const totalOpen = ref(0)
const totalClosed = ref(0)

onMounted(async() => {
  const salesOfToday = await SaleApi.todaySales()
  useOdometer(todaySales, salesOfToday.data, 1200)
  const salesOfMonth = await SaleApi.monthSales()
  useOdometer(monthSales, salesOfMonth.data, 1200)

  const orderAnalytics = await OrderApi.analytics()

  useOdometer(totalOrder, orderAnalytics.data.total, 400)
  useOdometer(totalOpen, orderAnalytics.data.open, 400)
  useOdometer(totalClosed, orderAnalytics.data.closed, 400)
})
</script>

<template>
  <main class="wrapper">
    <div class="today__sale__stats">
      <div class="flex gap-3 justify-between">
        <font-awesome-icon icon="fa-dollar-sign" color="#5243A0" class="bg-purple-200 p-3 rounded-md" />
        <span class="today__sale__header">Análise de vendas</span>
      </div>
      <div class="sale__made flex justify-around w-[100%]">
        <div class="flex flex-col items-center">
          <span class="text-gray-600 text-lg">Dia</span>
          <span class="font-bold"> {{ formatCurrency(todaySales) }} </span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-gray-600 text-lg">Mês</span>
          <span class="font-bold"> {{ formatCurrency(monthSales) }} </span>
        </div>
      </div>
    </div>

    <div class="today__sale__stats">
      <div class="flex gap-3 justify-between">
        <font-awesome-icon icon="fa-note-sticky" color="#5243A0" class="bg-purple-200 p-3 rounded-md" />
        <span class="today__sale__header">Análise de pedidos</span>
      </div>
      <div class="sale__made flex justify-around w-[100%]">
        <div class="flex flex-col items-center">
          <span class="text-gray-600 text-lg">Total</span>
          <span class="font-bold"> {{ totalOrder }} </span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-gray-600 text-lg">Em Abertos</span>
          <span class="font-bold"> {{ totalOpen }} </span>
        </div>

        <div class="flex flex-col items-center">
          <span class="text-gray-600 text-lg">Fechados</span>
          <span class="font-bold"> {{ totalClosed }} </span>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.wrapper {
  display: flex;
  background-color: #F6F7FB;
  flex-wrap: wrap;
  gap: 9rem;
}

.today__sale__stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background-color-primary);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 1.5rem;
  transition: .2s ease;
}

.today__sale__stats:hover {
  transform: scale(1.2);
}

.today__sale__header {
  display: flex;
  gap: 10px;
  font-size: 28px;
}
</style>
