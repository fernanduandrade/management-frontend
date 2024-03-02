<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as R from 'ramda'
import Dropdown from 'primevue/dropdown'
import PrimeButton from 'primevue/button'
import OrderProductForm from '~/orders/components/OrderProductForm.vue'
import { OrderDto } from '~/orders/types'
import OrderApi from '~/api/Order/OrderApi'
import { ProductDTO } from '~/products/types'
import { formatCurrency } from '~/common/logic'
import { PaymentType } from '~/sales/types'
import useToast from '~/composables/useToast'

const toast = useToast()

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

const findProduct = (list: ProductDTO[], name: string) => {
  const operation = R.pipe(
    R.map<ProductDTO, string>(x => x.name),
    R.includes(name),
  )

  return operation(list)
}

watch(modalEmitValue, async(value) => {
  const product = value as ProductDTO
  const hasProduct = findProduct(order.value!.products, product.name)
  if (hasProduct) {
    toast.info('Produto já incluido.')
    return
  }

  const result = await OrderApi.addProductToOrder({ orderId: order.value!.id, productId: product.id })
  if (order.value?.products.filter(p => p.name === product.name).length === 0) {
    order.value?.products.push({ ...product, quantity: result.data.quantity })
    return
  }

  const index = order.value?.products.findIndex(p => p.name === product.name)
  order.value!.products[index!].quantity = result.data.quantity
})

async function incrementProduct(id: string) {
  const index = order.value?.products.findIndex(p => p.id === id)
  order.value!.products[index!].quantity += 1
  await OrderApi.addProductToOrder({ orderId: order.value!.id, productId: id })
}

async function decrementProduct(id: string) {
  await OrderApi.removeProduct(id, order.value!.id)
  const index = order.value?.products.findIndex(p => p.id === id)
  order.value!.products[index!].quantity -= 1
  if (order.value!.products[index!].quantity === 0)
    order.value?.products.splice(index!, 1)
}

onMounted(async() => {
  const orderId = router.params.id as string
  const response = await OrderApi.getById(orderId)
  order.value = response.data
})

const paymentOptions = [
  { value: 'PIX', name: 'PIX' },
  { value: 'CARTAO', name: 'CARTÃO' },
  { value: 'DINHEIRO', name: 'DINHEIRO' },
]

const selectedPayment = ref({ name: '', value: '' })
</script>

<template>
  <main class="wrapper shadow-sm">
    <div class="order__actions">
      <h1 class="text-2xl font-mono">
        {{ order?.clientName }}
      </h1>
      <VButton :disabled="order?.status === 'FECHADO'" @click="addProduct">
        Incluir produto
      </VButton>
    </div>

    <div class="flex gap-2 flex-col">
      <h3 class="text-xl">
        Pedidos:
      </h3>

      <div v-for="product in order?.products" :key="product.id" class="flex gap-1 flex-col">
        <div class="flex items-center gap-1">
          <span>
            {{ product.name }}
          </span>
          <div class="rounded-md border-solid border-2 border-gray-200 p-1 flex gap-2 items-center">
            <PrimeButton
              label="+"
              class="w-[20px] font-bold text-xl text-blue-500 h-[25px] hover:bg-slate-300"
              :disabled="order?.status === 'FECHADO'"
              @click="incrementProduct(product.id)"
            />
            <span>{{ product.quantity }}</span>
            <PrimeButton
              label="-"
              class="w-[20px] font-bold text-xl text-blue-500 h-[25px] hover:bg-slate-300"
              :disabled="order?.status === 'FECHADO'"
              @click="decrementProduct(product.id)"
            />
          </div>
        </div>
      </div>

      <hr class="w-[30%]" />

      <span class="order__total">Total {{ formatCurrency(totalIncoming) }}</span>
    </div>

    <div class="order__actions">
      <div></div>
      <div class="flex gap-2">
        <Dropdown
          v-model="selectedPayment"
          class="shadow-md w-[150px]"
          :options="paymentOptions"
          option-label="name"
          placeholder="Forma de pagamento"
        />
        <VButton background-color="#f87171" :disabled="order?.status === 'FECHADO'" @click="closeOrder">
          ENCERRAR
        </VButton>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 9px;
}

.order__actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.order__total {
  font-size: 22px;
  font-weight: 500;
}
</style>
