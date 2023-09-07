import { Ref } from 'vue'

export function useFilter<T>(data: Ref<T[]>, key: string) {
  const search = ref('')
  watch(search, (newValue) => {
    data.value = data.value
      .filter((item: any) => item[key].toLowerCase().includes(newValue.toLowerCase()))
  })

  return { data, search }
}
