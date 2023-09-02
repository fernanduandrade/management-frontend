<script lang="ts" setup>
import { sort, prop, ascend, descend } from 'ramda'
import FontAwesomeIcon from '~/common/modules/fontawesome'
const { t } = useI18n()
type TableProps<T> = {
  columns: string[]
  data: T[]
}

const currencyBR = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
const props = defineProps<TableProps<any>>()

const sortOrderAsc = ref(false)

const toggleSortOrder = () => {
  sortOrderAsc.value = !sortOrderAsc.value
}
const tableData = ref<any>()
const sortTable = (column: string) => {
  const propName = prop<string>(column)
  toggleSortOrder()
  const sortingFn = sortOrderAsc.value
    ? ascend(propName)
    : descend(propName)
  tableData.value = sort(sortingFn, props.data)
}

const search = ref('')
// const filteredList = computed(() => {
//   return tableData.value.filter((item: any) => {
//     return (
//       item.name.toLowerCase().includes(search.value.toLowerCase())
//     )
//   })
// })

onUpdated(async() => (tableData.value = props.data))

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
          {{ t(`default_keys.${field.toLowerCase()}`) }} <em class="table__sort-icon">
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
      <tr v-for="item in tableData" :key="item.id">
        <td v-for="field in columns" :key="field">
          <spam v-if="field==='price'">
            {{ currencyBR.format(item[field]) }}
          </spam>
          <spam v-else>
            {{ item[field] }}
          </spam>
        </td>
        <td>
          <em>
            <font-awesome-icon
              icon="fa-solid fa-ellipsis-vertical"
            >
              width="15"
              height="15"
              @click="sortTable(field)"
              />
            </font-awesome-icon></em>
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
