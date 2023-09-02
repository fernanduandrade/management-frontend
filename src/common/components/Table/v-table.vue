<script lang="ts" setup>
import { sort, prop, ascend, descend } from 'ramda'
type TableProps<T> = {
  columns: string[]
  data: T[]
}
const props = defineProps<TableProps<any>>()

const updateData = ref<any[]>([])

onMounted(() => {
  updateData.value = props.data
})

const sortOrderAsc = ref(false)

const toggleSortOrder = () => {
  sortOrderAsc.value = !sortOrderAsc.value
}

const sortTable = (column: string) => {
  const propName = prop<string>(column)
  toggleSortOrder()
  const sortingFn = sortOrderAsc.value
    ? ascend(propName)
    : descend(propName)
  updateData.value = sort(sortingFn, props.data)
}

</script>

<template>
  <table id="tableComponent">
    <thead>
      <tr>
        <th v-for="(field, index) in columns" :key="index" @click="sortTable(field)">
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in updateData" :key="item.id">
        <td v-for="field in columns" :key="field">
          {{ item[field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
