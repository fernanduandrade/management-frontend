import { Ref } from 'vue'

export function useFilter<T>(items: Ref<T[]>, key: string) {
  const search = ref('')
  const data = computed(() => {
    return items.value
      .filter((item: any) => item[key].toLowerCase().includes(search.value.toLowerCase()))
  })

  return { data, search }
}
