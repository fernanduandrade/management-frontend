<script lang="ts" setup>
import OrderApi from '~/api/Order/OrderApi'

const modal = useModal()
const router = useRouter()

const clientName = ref('')
async function createOrder() {
  const { data } = await OrderApi.addOrder({ clientName: clientName.value })
  router.push(`/orders/${data.id}`)

  modal.close()
}
</script>

<template>
  <main class="main">
    <form class="form">
      <div>
        <VInputText v-model="clientName" type="text" placeholder="Nome" />
      </div>
    </form>
    <div class="self-center flex justify-between gap-4">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="createOrder">
        Cadastrar
      </VButton>
    </div>
  </main>
</template>

<style scoped>
.main {
  width: 600px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
</style>
