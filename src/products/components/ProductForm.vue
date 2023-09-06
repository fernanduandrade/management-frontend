<script lang="ts" setup>
import { CreateProductDTO } from '~/products/types/index'

const form = reactive<CreateProductDTO>({
  description: '',
  name: '',
  price: 0,
  quantity: 0,

})
</script>

<template>
  <div>
    <form>
      <VInputText v-model="form.name" placeholder="Nome" />
      <VInputText v-model="form.description" placeholder="Descrição" />
      <VInputText v-model="form.price" placeholder="Preço" />
      <VInputText v-model="form.quantity" placeholder="Quantidade" />
    </form>
  </div>
</template>

<style>
</style>
