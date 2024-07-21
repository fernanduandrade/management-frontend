<script lang="ts" setup>
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

onMounted(() => {
  currentPage.value = 'dashboards'
})
const pages: Page[] = [
  { name: 'Dashboard', link: '/dashboards', icon: 'fa-home' },
  { name: 'Pedidos', link: '/orders', icon: 'fa-note-sticky' },
  { name: 'Produtos', link: '/products', icon: 'fa-box-open' },
  { name: 'Clientes', link: '/clients', icon: 'fa-users' },
  { name: 'Vendas', link: '/sales', icon: 'fa-dollar-sign' },
  { name: 'Relatórios', link: '/reports', icon: 'fa-file-lines' },
]

const hideSideNav = ref(false)

const cssClasses = computed(() => {
  return {
    hide_nav: hideSideNav.value,
  }
})

const modifySideNav = () => {
  hideSideNav.value = !hideSideNav.value
}

</script>

<template>
  <nav class="sidenav" :class="[cssClasses]">
    <div class="sindenav__links">
      <div class="header__sidenav--modify flex items-center" @click="modifySideNav">
        <font-awesome-icon
          icon="fa-bars"
          color="#707070"
        />
      </div>
      <ul v-for="(page, i) in pages" :key="i">
        <li class="sindenav__link" :class="{ active: (currentPage === page.name) }" @click="goTo(page)">
          <em><font-awesome-icon :icon="`${page.icon}`" width="35" height="35" /></em>
          <span v-if="!hideSideNav" class="fade-in">{{ page.name }}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn .2s ease;
}

.header__sidenav--modify {
  padding: 6px;
  font-size: 1rem;
  height: 3rem;
  cursor: pointer;
  width: 3rem;
  justify-content: center;
  border-radius: 6px;
  background-color: #fff;
  margin-bottom: 20px;
}

.sidenav {
  height: 100vh;
  background-color: #315CA7;
  color: var(--text-black);
  padding: 20px 0px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 15%;
  gap: 3rem;
  border-right: var(--accent-color) solid 1px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: ease-in-out .2s;
}

@keyframes show_links {
0% {
  display: none;
}
  100% {
    display: block;
  }
}

.hide_nav {
  flex: 0 0 5%;
}

@media(max-width: 1280px) {
  .sidenav {
    flex: 0 0 20%
  }
}

.sindenav__links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.sindenav__link {
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
  padding-left: 1rem;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: ease-in .2s;
  font-weight: 400;
  width: 100%;
  color: var(--accent-color);
}

.sindenav__link.active {
  color: var(--accent-color);
  background-color: hsla(0, 0%, 100%, .16);;
}

.sindenav__link:hover {
  cursor: pointer;
  color: var(--accent-color);
  background-color: hsla(0, 0%, 100%, .16);;
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
