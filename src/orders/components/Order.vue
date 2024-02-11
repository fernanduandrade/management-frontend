<script lang="ts" setup>
import { PropType } from 'vue'
import { Order } from '../types'

const router = useRouter()
const props = defineProps({
  order: Object as PropType<Order>,
})

const orderStatus = {
  ABERTO: '#6ee7b7',
  AGUARDANDO: '#fcd34d',
  FECHADO: '#f87171',
}

const orderStatusColor = ref('')

function goToOrder() {
  router.push(`/orders/${props.order?.id}`)
}

onMounted(() => {
  orderStatusColor.value = orderStatus[props.order!.status]
})
</script>

<template>
  <main class="container">
    <div class="order__info">
      <span class="order__client">{{ order?.clientName }}</span>
      <span class="order__status" :style="{backgroundColor: orderStatusColor}">{{ order?.status }}</span>
    </div>

    <div class="order__button">
      <span>Total: aaa </span>
      <vButton @click="goToOrder">
        Visualizar
      </vButton>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 340px;
  height: 160px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  transition: all .2s ease-out;
  display: flex;
  flex-direction: column;
  gap:25px;
}

.container:hover {
  border: 2px solid #22d3ee;
  transform: scale(1.1)
}

.order__info {
  display:flex;
  flex-direction: column;
  gap: 2px;
}

.order__client {
  text-transform: upper;
  font-weight: 500;
  font-size: 20px
}

.order__status {
  font-size: 16px;
  color: #ffffff;
  background-color: #333;
  border-radius: 4px;
  width: fit-content;
  padding: 5px;
  font-weight: 500;
}

.order__button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}
</style>
