<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as R from 'ramda'
import useModal from '~/common/logic/use-modal'
import OrderProductForm from '~/orders/components/OrderProductForm.vue'
import { OrderDto } from '~/orders/types'
import OrderApi from '~/api/Order/OrderApi'
import { ProductDTO } from '~/products/types'
import { formatCurrency } from '~/common/logic'
import { PaymentType } from '~/sales/types'

interface OrderResume {
  name: string
  count: number
}

const router = useRoute()
const order = ref<OrderDto>()
const modal = useModal()
const selectPayment = ref<PaymentType>()

function addProduct() {
  return modal.openModal({ component: markRaw(OrderProductForm) })
}

const { modalEmitValue } = storeToRefs(modal)

const totalIncoming = computed(() => {
  const value = order.value?.products ?? 0
  if (!value) return 0

  return R.pipe(
    R.map<ProductDTO, number>(p => p.price * p.quantity),
    R.sum,
  )(value)
})

async function closeOrder() {
  await OrderApi.closeOrder(order.value!.id, selectPayment.value!)
}

watch(modalEmitValue, async(value) => {
  const product = value as ProductDTO
  const result = await OrderApi.addProductToOrder({ orderId: order.value!.id, productId: product.id })
  if (order.value?.products.filter(p => p.name === product.name).length === 0) {
    order.value?.products.push({ ...product, quantity: result.data.quantity })
    return
  }

  const index = order.value?.products.findIndex(p => p.name === product.name)
  order.value!.products[index!].quantity = result.data.quantity
})

onMounted(async() => {
  const orderId = router.params.id as string
  const response = await OrderApi.getById(orderId)
  order.value = response.data
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

    <div v-for="product in order?.products" :key="product.id">
      {{ product.quantity }}x {{ product.name }}
    </div>

    <div class="order__actions">
      <span class="order__total">Total {{ formatCurrency(totalIncoming) }}</span>
      <select v-model="selectPayment">
        <option disabled value="">
          Forma de pagamento
        </option>
        <option>
          PIX
        </option>
        <option>
          DINHEIRO
        </option>
        <option>
          CARTAO
        </option>
      </select>
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
