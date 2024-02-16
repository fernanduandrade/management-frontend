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
  { name: 'Pedidos', link: '/orders', icon: 'fa-note-sticky' },
  { name: 'Vendas', link: '/sales', icon: 'fa-dollar-sign' },
  { name: 'Relatórios', link: '/reports', icon: 'fa-file-lines' },
]

</script>

<template>
  <nav class="sidenav">
    <h1 class="sidenav__app_name">
      Bar Zaza
    </h1>
    <div class="sindenav__links">
      <ul v-for="(page, i) in pages" :key="i">
        <li class="sindenav__link" :class="{ active: (currentPage === page.name) }" @click="goTo(page)">
          <em><font-awesome-icon :icon="`${page.icon}`" width="35" height="35" /></em> &nbsp; {{ page.name }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

.sidenav {
  height: 100vh;
  background-color: var(--background-color-primary);
  color: var(--text-black);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 17%;
  gap: 3rem;
  border-right: var(--accent-color) solid 1px;
}

.sidenav__app_name {
  color: var(--background--hover--text);
  font-weight: 600;
  font-size: 3rem;
  display: block;
  user-select: none;
}

.sindenav__links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.sindenav__link {
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
  padding: 1rem;
  border-radius: 18px;
  transition: ease-in .2s;
  font-weight: 400;
  width: 100%;
}

.sindenav__link.active {
  color: var(--background--hover--text);
  background-color: var(--background--hover);
}

.sindenav__link:hover {
  cursor: pointer;
  color: var(--background--hover--text);
  background-color: var(--background--hover);
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
