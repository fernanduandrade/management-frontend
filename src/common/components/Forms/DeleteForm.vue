
<script lang="ts" setup>
import { BaseApi } from '~/api/Base/api'

const router = useRouter()
const modal = useModal()

interface DeleteRecord {
  id: string
  resource: string
}
const props = defineProps<DeleteRecord>()

async function deleteEntity() {
  const api = new BaseApi(props.resource)
  await api.delete(props.id)
  modal.close()
  router.push(`/${props.resource}`)
}

</script>

<template>
  <main class="container">
    <span class="self-center text-lg">Deseja realmente remover o registro?</span>
    <div class="self-center flex justify-between gap-4">
      <VButton :transparent="true" @click="modal.close">
        Cancelar
      </VButton>
      <VButton @click="deleteEntity">
        Excluir?
      </VButton>
    </div>
  </main>
</template>
