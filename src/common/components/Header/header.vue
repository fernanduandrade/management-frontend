<script lang="ts" setup>
import FontAwesomeIcon from '~/common/modules/fontawesome'
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
      <div>
        <em class="header__sidenav--modify">
          <font-awesome-icon
            icon="fa-bars"
            width="15"
            height="15"
            @click="modifySideNav"
          />
        </em>
        Usuário / {{ t(`pages.${router.currentRoute.value.name as string}`) }}
      </div>
      <div><h1>Weeeeeeeeeeeeeeeeeeeeeeeeeee</h1></div>
      <div></div>
    </header>
  </main>
</template>

<style scoped>
#container {
  background-color: #F1F1F1;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.9);

}
.header {
  padding: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
  width: 100%;
}

.header__sidenav--modify {
  cursor: pointer;
}
</style>
