<script lang="ts" setup>
import FontAwesomeIcon from '~/common/modules/fontawesome'
const router = useRouter()
const currentPage = ref('')

const goTo = (pageName: string) => {
  currentPage.value = pageName
  router.push(`/${pageName}`)
}

const productPage = ref('products')
const clientPage = ref('clients')
const salePage = ref('sales')
const reportPage = ref('reports')
</script>

<template>
  <nav class="sidenav">
    <spam class="sidenav__dashboard">
      Dashboards
    </spam>
    <ul class="sindenav__links">
      <li class="sindenav__link" :class="{ active: (currentPage === productPage) }" @click="goTo('products')">
        <spam><font-awesome-icon icon="fa-box-open" width="15" height="15" /></spam> &nbsp; Produtos
      </li>
      <li class="sindenav__link" :class="{ active: (currentPage === clientPage) }" @click="goTo('clients')">
        <spam><font-awesome-icon icon="fa-users" width="15" height="15" /></spam> &nbsp; Clientes
      </li>
      <li class="sindenav__link" :class="{ active: (currentPage === salePage) }" @click="goTo('sales')">
        <spam><font-awesome-icon icon="fa-cart-shopping" width="15" height="15" /></spam> &nbsp; Vendas
      </li>
      <li class="sindenav__link" :class="{ active: (currentPage === reportPage) }" @click="goTo('reports')">
        <spam><font-awesome-icon icon="fa-file-lines" width="15" height="15" /></spam> &nbsp; Relatórios
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
