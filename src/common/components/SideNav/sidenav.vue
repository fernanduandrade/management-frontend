<script lang="ts" setup>
import FontAwesomeIcon from '~/common/modules/fontawesome'
const router = useRouter()
const currentPage = ref('')

interface Page {
  icon: string
  link: string
  name: string
}

const goTo = (page: Page) => {
  currentPage.value = page.name
  router.push(page.link)
}

const pages: Page[] = [
  { name: 'Produtos', link: '/products', icon: 'fa-box-open' },
  { name: 'Clientes', link: '/clients', icon: 'fa-users' },
  { name: 'Vendas', link: '/sales', icon: 'fa-cart-shopping' },
  { name: 'Relatórios', link: '/reports', icon: 'fa-file-lines' },
  { name: 'Pedidos', link: '/orders', icon: 'fa-file-lines' },
]

</script>

<template>
  <nav class="sidenav">
    <h4 class="sidenav__dashboard">
      Dashboards
    </h4>
    <ul v-for="(page, i) in pages" :key="i" class="sindenav__links">
      <li class="sindenav__link" :class="{ active: (currentPage === page.name) }" @click="goTo(page)">
        <em><font-awesome-icon :icon="`${page.icon}`" width="15" height="15" /></em> &nbsp; {{ page.name }}
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidenav {
  height: 100vh;
  background-color: #333;
  color: white;
  padding: 20px;
  flex: 0 0 15%
}

.sidenav__dashboard {
  font-weight: 300;
  color: rgb(186, 184, 184);
  margin-bottom: 14px;
  display: block;
}

.sindenav__links {
  margin-left: 15px;
}

.sindenav__link {
  font-size: 18px;
  padding: 0px 10px 0px 10px;
  border-radius: 4px;
  transition: ease-in .2s;
  font-weight: 400;
}

.sindenav__link.active {
  border-left: 8px grey solid;
  background-color: #262626;
}

.sindenav__link:hover {
  cursor: pointer;
  background-color: #262626;
}

.sindenav__link:not(:last-child) {
  margin-bottom: 12px;
}

.sidenav ul {
  list-style: none;
  padding: 0;
}

.sidenav a {
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px 0;
}

</style>
