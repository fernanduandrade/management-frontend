<script lang="ts" setup>
import ReportApi from '~/api/Report/ReportApi'

const loading = reactive<{[key: string]: boolean}>({
  salesReport: false,
  productList: false,
  clientStatus: false,
})

const salesByDate = reactive({
  start: '',
  end: '',
})

const validateSalesInputDate = computed(() => {
  if (salesByDate.start && salesByDate.end)
    return true

  return false
})

async function getSalesReport() {
  loading.salesReport = true

  const { data, fetchData } = await ReportApi.salesByDate(salesByDate.start, salesByDate.end)
  await fetchData()

  generatePdf(data.value as Blob)
  loading.salesReport = false
}

async function getClientStatusReport() {
  loading.clientStatus = true

  const { data, fetchData } = await ReportApi.clientStatus()
  await fetchData()

  generatePdf(data.value as Blob)
  loading.clientStatus = false
}

async function getProductListReport() {
  loading.productList = true

  const { data, fetchData } = await ReportApi.productList()
  await fetchData()

  generatePdf(data.value as Blob)
  loading.productList = false
}

function generatePdf(blob: Blob) {
  const uriDownload = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = uriDownload
  a.download = 'relatório.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

</script>

<template>
  <main class="flex flex-col gap-5">
    <section class="wrapper items-center justify-between">
      <span class="text-xl">Listar produtos</span>
      <VButton icon="fa-file-arrow-down" :loading="loading.productList" :outline="true" @click="getProductListReport" />
    </section>

    <Divider />
    <section class="wrapper justify-between items-center">
      <span class="text-xl">Relatório de vendas</span>
      <div class="flex self-end gap-3">
        <div>
          <VInputText v-model="salesByDate.start" type="date" placeholder="Data inicial" />
        </div>
        <div>
          <VInputText v-model="salesByDate.end" type="date" placeholder="Data final" />
        </div>
      </div>
      <VButton
        :outline="true"
        :disabled="!validateSalesInputDate"
        :loading="loading.salesReport"
        icon="fa-file-arrow-down"
        @click="getSalesReport"
      />
    </section>

    <Divider />
    <section class="wrapper justify-between items-center">
      <span class="text-xl">Listar clientes</span>
      <VButton :outline="true" :loading="loading.clientStatus" icon="fa-file-arrow-down" @click="getClientStatusReport" />
    </section>
  </main>
</template>

<style scoped>
</style>
