<script lang="ts" setup>
const router = useRouter()
const goTo = (pageName: string) => router.push(`/${pageName}`)
</script>

<template>
  <nav class="sidenav">
    <h4>Dashboards</h4>
    <ul>
      <li><a data-section="section1" @click="goTo('products')">Produtos</a></li>
      <li><a data-section="section2" @click="goTo('clients')">Clientes</a></li>
      <li><a data-section="section3" @click="goTo('sales')">Vendas</a></li>
      <li><a data-section="section4" @click="goTo('reports')">Relatórios</a></li>
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
