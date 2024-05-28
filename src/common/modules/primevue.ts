import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

import Dropdown from 'primevue/dropdown'
import PrimeButton from 'primevue/button'

import { UserModule } from '~/types'
export const install: UserModule = ({ app }) => {
  app.use(PrimeVue)
    .component('Dropdown', Dropdown)
    .component('PrimeButton', PrimeButton)
}
