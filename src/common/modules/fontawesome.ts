import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUsers,
  faFileLines,
  faCartShopping,
  faBoxOpen,
  faBars,
  faSort,
  faEllipsisVertical,
  faDollarSign,
  faNoteSticky,
  faAngleRight,
  faAngleLeft,
  faHome,
  faMessage,
  faChevronRight,
  faXmark,
  faSearch,
  faMagnifyingGlass,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { UserModule } from '~/types'

library.add(
  faUsers,
  faFileLines,
  faCartShopping,
  faBoxOpen,
  faBars,
  faSort,
  faEllipsisVertical,
  faDollarSign,
  faNoteSticky,
  faAngleRight,
  faAngleLeft,
  faHome,
  faMessage,
  faChevronRight,
  faXmark,
  faSearch,
  faMagnifyingGlass,
  faPen,
  faTrash,
)

export const install: UserModule = ({ app }) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
