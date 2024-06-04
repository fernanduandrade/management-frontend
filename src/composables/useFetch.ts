import { isEmpty } from 'ramda'

type HttpRequest = 'POST' | 'DELETE' | 'GET' | 'PUT' | 'PATCH'

interface Options {
  headers?: Record<string, string>
  method?: HttpRequest
  returnBlob?: boolean
  body?: string
}

const toast = useToast()

export default function useFetch<TResult>(url: string, options: Options = {}) {
  const data = ref<TResult>()
  const error = ref('')

  const { signal, abort } = new AbortController()

  const fetchData = async() => {
    const defaultOption: Options = {
      returnBlob: false,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'GET',
    }

    if (!isEmpty(options))
      options = { ...defaultOption, ...options }
    else
      options = { ...defaultOption }

    try {
      if (signal.aborted)
        return

      const response = await fetch(url, { signal, ...options })

      data.value = options.returnBlob ? await response.blob() : await response.json()
    }
    catch (exception: any) {
      // TODO refatorar esse cara
      error.value = exception.message
      toast.warning('Serviço indisponível no momento')
    }
  }

  return { data, error, abort, fetchData }
}
