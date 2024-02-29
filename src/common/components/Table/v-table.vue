<script lang="ts" setup>
import { sort, prop, ascend, descend } from 'ramda'
import FontAwesomeIcon from '~/common/modules/fontawesome'
import { formatCurrency } from '~/common/logic'
const { t } = useI18n()
const router = useRouter()
type TableProps<T> = {
  columns: string[]
  data: T[]
  page: string
}

const orderStatus = {
  ABERTO: { bg: '#E3E5FC', color: '#537BFA' },
  FECHADO: { bg: '#DFEDE6', color: '#7FB48E' },
  AGUARDANDO: { bg: '#FFF2E3', color: '#333' },
}

const props = defineProps<TableProps<any>>()

const sortedItems = ref<any[]>([])

watch(
  () => props.data,
  (newItems) => {
    sortedItems.value = newItems
  },
)

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
  sortedItems.value = sort(sortingFn, props.data)
}

function goTo(id: string) {
  console.log(props.page)
  router.push(`/${props.page}/${id}`)
}
</script>

<template>
  <table id="tableComponent">
    <thead class="table__header">
      <tr>
        <th v-for="(field, index) in columns" :key="index">
          {{ t(`default_domain_keys.${field.toLowerCase()}`) }} <em class="table__sort-icon">
            <font-awesome-icon
              icon="fa-sort"
              width="15"
              height="15"
              @click="sortTable(field)"
            />
          </em>
        </th>
        <th>{{ t('table.actions') }}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="item in sortedItems" :key="item.id">
        <td v-for="field in columns" :key="field">
          <span v-if="['pricePerUnit', 'price', 'totalPrice'].includes(field)">
            {{ formatCurrency(item[field]) }}
          </span>
          <span v-else-if="field==='isActive'">
            {{ item[field] ? 'ativo' : 'desativado' }}
          </span>
          <span
            v-else-if="field==='status'"
            :style="`background-color: ${(orderStatus as any)[item[field]].bg}; color: ${(orderStatus as any)[item[field]].color}`"
            :class="`block rounded-md p-1 w-fit font-bold`"
          >
            {{ item[field] }} {{ }}
          </span>
          <span v-else-if="field.toLowerCase().includes('date')">
            {{ new Date(item[field]).toLocaleDateString('pt-BR') }}
          </span>
          <span v-else>
            {{ item[field] }}
          </span>
        </td>
        <td class="table__actions">
          <em @click="goTo(item['id'])">
            <font-awesome-icon
              icon="fa-chevron-right"
            >
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
  border-collapse: collapse;
  margin: 15px 0px;
}

.table__header {
  height: 48px;
  font-size: 18px;
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  color: var(--text-secondary-dark);
  border-top: #bec1ca solid 1px;
  border-bottom: #bec1ca solid 1px;
  text-align: left;
}

#tableComponent thead tr {
  text-align: left;
}

#tableComponent .table__body tr{
  border-radius: 8px;
  transition: all .2s ease-in-out;
}

#tableComponent .table__body tr:hover {
  background-color: #bec1ca;
}

#tableComponent th,
#tableComponent td {
  padding: 4px;
  text-align: left;
}

.table__sort-icon {
  transition: ease-in .2s;
}

.table__sort-icon:hover {
  cursor: pointer;
}

.table__body {
  text-align: center;
  color: var(--text-secondary-dark);
  font-weight: 500;
  font-size: 1.2em;
}

.table__actions {
  transition: all .2s ease-in;
}

.table__actions:hover {
  cursor: pointer;
}
</style>
