import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

import { UserModule } from '~/types'
export const install: UserModule = ({ app }) => {
  app.use(PrimeVue)
}
