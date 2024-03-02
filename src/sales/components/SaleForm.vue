<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { CreateSaleDTO } from '~/sales/types/index'
import SaleApi from '~/api/Sale/SaleApi'
import { ResultType } from '~/common/types/ResponseDTO'
import { formatCurrency } from '~/common/logic'
import 'vue3-toastify/dist/index.css'
const store = useModal()

const form = reactive<CreateSaleDTO>({
  clientName: '',
  pricePerUnit: 0,
  productId: 0,
  saleDate: '',
  quantity: 0,
})

const totalSold = computed(() => {
  const soldValue = form.quantity * form.pricePerUnit
  form.totalPrice = soldValue
  return formatCurrency(soldValue)
})

async function createSale() {
  const response = await SaleApi.createSale(form)
  switch (response.type) {
    case ResultType.success:
      toast.success(response.message, {
        autoClose: 1000,
      })
      store.setFormValue(response.data)
      store.closeModal()
      break
    case ResultType.warning:
      toast.warning(response.message, {

        autoClose: 1000,
      })
      break
    default:
      break
  }
}
</script>

<template>
  <div class="wrapper">
    <form class="form">
      <div>
        <label for="">Nome do cliente</label>
        <VInputText v-model="form.clientName" placeholder="Nome do cliente" />
      </div>
      <div>
        <label for="">Preço da unidade</label>
        <VInputText v-model="form.pricePerUnit" placeholder="Preço da unidade" />
      </div>
      <div>
        <label for="">Quantidade vendidade</label>
        <VInputText v-model="form.quantity" type="number" placeholder="Quantidade" />
      </div>
      <div>
        <label for="">Data da venda</label>
        <VInputText v-model="form.saleDate" type="date" placeholder="Data da venda" />
      </div>
      <div>
        <label for="">Produto</label>
        <VInputText v-model="form.productId" type="number" placeholder="Produto" />
      </div>
    </form>
    <div class="form__button">
      <span>Total - {{ totalSold }}</span>
      <VButton @click="createSale">
        Cadastrar
      </VButton>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form__button {
  display: flex;
  justify-content: space-between;
}

</style>
