import { ToastOptions, toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const options: ToastOptions = { theme: 'light', position: 'top-center' }

const alert = () => ({
  info: (message: string) => (toast.info(message, options)),
  warning: (message: string) => (toast.warning(message, options)),
  success: (message: string) => (toast.success(message, options)),
  error: (message: string) => (toast.error(message, options)),
})

export default alert
