<script lang="ts" setup>

type ButtonProps = {
  backgroundColor?: string
  funcCallBack?: Function
}

const algo = ref(0)

const props = withDefaults(defineProps<ButtonProps>(), {
  backgroundColor: 'blue',
  funcCallBack: () => 1 + 1,
})

const add = () => algo.value += (1 + 1)
</script>

<template>
  <div class="wrapper-button">
    <button class="button" @click="add">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
.wrapper-button{

}

.button {
  color: #fff;
  background-color: v-bind(backgroundColor);
  width: 86px;
  height: 27px;
}
</style>
