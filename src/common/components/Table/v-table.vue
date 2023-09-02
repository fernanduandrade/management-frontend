<script lang="ts" setup>
import { sort, prop, ascend, descend } from 'ramda'
import FontAwesomeIcon from '~/common/modules/fontawesome'
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

const search = ref('')
const filteredList = computed(() => {
  return updateData.value.filter((item: any) => {
    return (
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})
</script>

<template>
  <div>
    <VInputSearch v-model="search" placeholder="Pesquise pelo nome" />
    <br>
  </div>
  <table id="tableComponent">
    <thead class="table__header">
      <tr>
        <th v-for="(field, index) in columns" :key="index">
          {{ field }} <em class="table__sort-icon">
            <font-awesome-icon
              icon="fa-sort"
              width="15"
              height="15"
              @click="sortTable(field)"
            />
          </em>
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="item in filteredList" :key="item.id">
        <td v-for="field in columns" :key="field">
          {{ item[field] }}
        </td>
        <td>
          <slot name="actions">
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

.table__header {
  height: 48px;
  text-transform: uppercase;
  color: #3A3541;
  border: #B9B9B9 solid 1px;
}

.table__sort-icon {
  transition: ease-in .2s;
}

.table__sort-icon:hover {
  cursor: pointer;
}

.table__body {
  text-align: center;
  color: #7D7D7D;
  font-size: 1.4rem;
}
</style>
