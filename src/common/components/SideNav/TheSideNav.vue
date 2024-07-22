<script lang="ts" setup>
const router = useRouter();
const currentPage = ref("");

interface Page {
  icon: string;
  link: string;
  name: string;
}

const goTo = (page: Page) => {
  currentPage.value = page.name;
  router.push(page.link);
};

onMounted(() => {
  currentPage.value = "dashboards";
});
const pages: Page[] = [
  { name: "Dashboard", link: "/dashboards", icon: "fa-home" },
  { name: "Pedidos", link: "/orders", icon: "fa-note-sticky" },
  { name: "Produtos", link: "/products", icon: "fa-box-open" },
  { name: "Clientes", link: "/clients", icon: "fa-users" },
  { name: "Vendas", link: "/sales", icon: "fa-dollar-sign" },
  { name: "Relatórios", link: "/reports", icon: "fa-file-lines" },
];

const hideSideNav = ref(false);

const modifySideNav = () => {
  hideSideNav.value = !hideSideNav.value;
};
</script>

<template>
  <nav class="sidenav" >
    <div class="sindenav__links">
      <div
        class="header__sidenav--modify flex items-center"
        @click="modifySideNav"
      >
        <font-awesome-icon icon="fa-bars" color="#707070" />
      </div>
      <ul>
        <li
          v-for="(page, i) in pages"
          :key="i"
          class="sindenav__link"
          :class="{ active: currentPage === page.name }"
          @click="goTo(page)"
        >
          <em
            ><font-awesome-icon :icon="`${page.icon}`" width="35" height="35"
          /></em>

          <span v-if="!hideSideNav" class="page__text">{{ page.name }}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
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
  background-color: #315ca7;
  color: var(--text-black);
  padding: 20px 0px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  gap: 3rem;
  border-right: var(--accent-color) solid 1px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.page__text {
  animation: fadeIn 0.5s ease-in-out forwards;
  width: 125px;
}

@media (max-width: 1280px) {
  .sidenav {
    flex: 0 0 20%;
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
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.2rem;
  font-size: 1.2rem;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  font-weight: 400;
  color: var(--accent-color);
}

.sindenav__link.active {
  color: var(--accent-color);
  background-color: hsla(0, 0%, 100%, 0.16);
}

.sindenav__link:hover {
  cursor: pointer;
  color: var(--accent-color);
  background-color: hsla(0, 0%, 100%, 0.16);
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
