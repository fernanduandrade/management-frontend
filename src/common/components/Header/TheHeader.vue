<script lang="ts" setup>
const router = useRouter()
const { t } = useI18n()

const sideNavState = ref(true)

const emit = defineEmits<{
  (event: 'sideNavEvent', value: boolean): void
}>()

const modifySideNav = () => {
  sideNavState.value = !sideNavState.value
  emit('sideNavEvent', sideNavState.value)
}
</script>

<template>
  <main id="container">
    <header class="header">
      <div class="header__content">
        <font-awesome-icon
          class="header__sidenav--modify"
          icon="fa-bars"
          @click="modifySideNav"
        />
        <h1 class="text-[25px] font-bold">
          {{ t(`pages.${router.currentRoute.value.name as string}`) }}
        </h1>
      </div>
      <!-- <h1>user vai aqui</h1> -->
    </header>
  </main>
</template>

<style scoped>
#container {
  background-color: #FFFFFF;
  border-bottom: var(--accent-color) 1px solid;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.header {
  padding: 2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.header__sidenav--modify {
  cursor: pointer;
  font-size: 30px;
}

.header__content {
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
