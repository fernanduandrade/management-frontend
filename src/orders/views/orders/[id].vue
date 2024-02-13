<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as R from 'ramda'
import useModal from '~/common/logic/use-modal'
import OrderProductForm from '~/orders/components/OrderProductForm.vue'
import { OrderDto } from '~/orders/types'
import OrderApi from '~/api/Order/OrderApi'
import { ProductDTO } from '~/products/types'
import { formatCurrency } from '~/common/logic'

const router = useRoute()
const order = ref<OrderDto>()
const modal = useModal()
function addProduct() {
  return modal.openModal({ component: markRaw(OrderProductForm) })
}

const distinctProducts = ref([])
const { modalEmitValue } = storeToRefs(modal)

const totalIncoming = computed(() => {
  const value = order.value?.products ?? 0
  if (!value) return 0

  return R.pipe(
    R.map<ProductDTO, number>(R.prop('price')),
    R.sum,
  )(value)
})

watch(modalEmitValue, async(value) => {
  const product = value as ProductDTO
  await OrderApi.addProductToOrder({ orderId: order.value!.id, productId: product.id })
  order.value?.products.push(product)
})

onMounted(async() => {
  const orderId = router.params.id as string
  const response = await OrderApi.getById(orderId)
  order.value = response.data
})

watchEffect(() => {
  distinctProducts.value = order.value?.products.reduce((acc, product) => {
    const existingProduct = acc.find(p => p.name === product.name)

    if (existingProduct)
      existingProduct.count += 1
    else
      acc.push({ name: product.name, count: 1 })

    return acc
  }, [])
})
</script>

<template>
  <main class="wrapper">
    <div class="order__actions">
      <VButton @click="addProduct">
        Incluir produto
      </VButton>
    </div>

    <h1>{{ order?.clientName }}</h1>

    <h3>Pedidos:</h3>

    <div v-for="(product, index) in distinctProducts" :key="index">
      {{ product.count }}x {{ product.name }}
    </div>

    <div class="order__actions">
      <span class="order__total">Total {{ formatCurrency(totalIncoming) }}</span>
      <VButton background-color="#f87171" @click="closeOrder">
        ENCERRAR
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

.order__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
}

.order__total {
  font-size: 22px;
  font-weight: 500;
}
</style>
