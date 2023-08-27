<template>
  <nav id="sidenav" class="sidenav">
    <h4>Dashboards</h4>
    <ul>
      <li><a href="#" data-section="section1">Produtos</a></li>
      <li><a href="#" data-section="section2">Clientes</a></li>
      <li><a href="#" data-section="section2">Vendas</a></li>
    </ul>
  </nav>
</template>

<style>
.sidenav {
  flex: 25%;
  width: 200px;
  height: 100vh;
  background-color: #333;
  color: white;
  padding: 20px;
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
