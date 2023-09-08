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
          <span v-if="field==='price'">
            {{ currencyBR.format(item[field]) }}
          </span>
          <span v-else-if="field.toLowerCase().includes('date')">
            {{ new Date(item[field]).toLocaleDateString('pt-BR') }}
          </span>
          <span v-else>
            {{ item[field] }}
          </span>
        </td>
        <td class="table__actions">
          <em>
            <font-awesome-icon
              icon="fa-solid fa-ellipsis-vertical"
            >
              width="15"
              height="15"
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

.table__actions {
  transition: all .2s ease-in;
}

.table__actions:hover {
  cursor: pointer;
}
</style>
