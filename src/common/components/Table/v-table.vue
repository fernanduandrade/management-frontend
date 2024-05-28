<script lang="ts" setup>
import { sort, prop, ascend, descend } from 'ramda'
import { formatCurrency } from '~/common/logic'
const { t } = useI18n()
const router = useRouter()
type TableProps<T> = {
  columns: string[]
  data: T[]
  page: string
}

const ids = ref<string[]>([])

// const userStatusClasses = computed((aa) => {
//   return {
//     'table__user__status active': aa,
//     'table__user__status inactive': !aa,
//   }
// })

const orderStatus = {
  ABERTO: { bg: '#E3E5FC', color: '#537BFA' },
  FECHADO: { bg: '#DFEDE6', color: '#7FB48E' },
  AGUARDANDO: { bg: '#FFF2E3', color: '#333' },
}

const emits = defineEmits(['selectIds'])
const props = defineProps<TableProps<any>>()

const sortedItems = ref<any[]>([])

watch(
  () => props.data,
  (newItems) => {
    sortedItems.value = newItems.map(x => ({ ...x, select: false }))
    ids.value = []
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
  router.push(`/${props.page}/${id}`)
}

const selectAll = ref(false)

watch(selectAll, (newValue) => {
  sortedItems.value.forEach((item) => {
    item.select = newValue
  })

  ids.value = sortedItems.value.filter(x => x.select)
  emits('selectIds', ids.value)
})

function onSelectItem(evt: boolean, id: string) {
  if (evt) {
    ids.value.push(id)
    emits('selectIds', ids.value)
    return
  }

  const idIndex = ids.value.findIndex(x => x === id)
  ids.value.splice(idIndex, 1)
  emits('selectIds', ids.value)
}

function userStatus(status: boolean) {
  return {
    'table__user__status active': status,
    'table__user__status inactive': !status,
  }
}

</script>

<template>
  <table id="tableComponent">
    <thead class="table__header">
      <tr>
        <th>
          <VCheckbox v-model="selectAll" />
        </th>
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
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="item in sortedItems" :key="item.id">
        <td>
          <VCheckbox v-model="item.select" @update:model-value="onSelectItem($event, item.id)" />
        </td>
        <td v-for="field in columns" :key="field">
          <span v-if="['pricePerUnit', 'price', 'totalPrice', 'debt', 'credit'].includes(field)">
            {{ formatCurrency(item[field]) }}
          </span>
          <span
            v-else-if="field === 'isActive'"
            :class="userStatus(item[field])"
            class="uppercase"
          >
            {{ item[field] ? 'ativo' : 'inativo' }}
          </span>
          <span
            v-else-if="field==='status'"
            :style="`background-color: ${(orderStatus as any)[item[field]].bg}; color: ${(orderStatus as any)[item[field]].color}`"
            :class="`block text-center rounded-md w-[120px] p-1 font-bold`"
          >
            {{ item[field] }}
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
  background-color: #f0f1f3;
}

#tableComponent th,
#tableComponent td {
  padding: 10px;
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
  background-color: #bec1ca;
}

.table__user__status.inactive {
  background-color: #fca5a5;
  color: #f87171;
  @apply rounded-md w-[120px] p-1 font-bold
}

.table__user__status.active {
  background-color: #DFEDE6;
  color: #7FB48E;
  @apply rounded-md w-[120px] p-1 font-bold
}
</style>
