<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { formatCurrency } from '~/common/logic'
import ClientApi from '~/api/Client/ClientApi'
import { ClientDTO } from '~/clients/types'

const route = useRoute()

const client = ref<ClientDTO>()

const onEditing = ref(false)
onMounted(async() => {
  const orderId = route.params.id as string
  const { data } = await ClientApi.getById(orderId)
  client.value = data
})
</script>

<template>
  <main class="wrapper shadow-sm">
    <div class="client__actions">
      <h1 class="text-2xl font-mono">
        {{ client?.name }} {{ client?.lastName }}
      </h1>
      <div class="flex items-center gap-3">
        <VButton v-if="!onEditing" icon="fa-pen" :transparent="true" :outline="true" @click="onEditing = !onEditing">
          Editar
        </VButton>
        <VButton v-if="onEditing" icon="fa-xmark" background-color="red" @click="onEditing = !onEditing">
          Cancelar
        </VButton>
        <VButton v-if="onEditing">
          Salvar
        </VButton>
        <VButton v-if="!onEditing">
          Adicionar insumo
        </VButton>
      </div>
    </div>

    <div v-if="!onEditing" class="flex gap-2 flex-col">
      <h3 class="text-[30px] font-semibold">
        Dados:
      </h3>
      <span>Débito {{ formatCurrency(client?.debt) }}</span>
      <span>Credito {{ formatCurrency(client?.credit) }}</span>
      <!-- <div v-for="product in order?.products" :key="product.id" class="flex gap-1 flex-col">
        <div class="flex items-center gap-1">
          <span>
            {{ product.name }}
          </span>
          <div class="rounded-md border-solid border-2 border-gray-200 p-1 flex gap-2 items-center">
            <PrimeButton
              label="-"
              class="w-[20px] font-bold text-xl text-blue-500 h-[25px] hover:bg-slate-300"
              :disabled="order?.status === 'FECHADO'"
              @click="decrementProduct(product.id)"
            />
            <span>{{ product.quantity }}</span>
            <PrimeButton
              label="+"
              class="w-[20px] font-bold text-xl text-blue-500 h-[25px] hover:bg-slate-300"
              :disabled="order?.status === 'FECHADO'"
              @click="incrementProduct(product.id)"
            />
          </div>
        </div>
      </div> -->

      <hr class="w-[30%]" />
    </div>

    <div class="client__actions">
      <div></div>
      <div class="flex gap-2">
        <!-- <Dropdown
          v-model="selectPayment"
          class="shadow-md w-[150px]"
          :options="paymentOptions"
          option-label="name"
          placeholder="Forma de pagamento"
        />
        <VButton background-color="#f87171" :disabled="order?.status === 'FECHADO'" @click="closeOrder">
          ENCERRAR
        </VButton> -->
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

.client__actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
</style>
