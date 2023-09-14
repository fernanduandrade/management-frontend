<script lang="ts" setup>

type ButtonProps = {
  backgroundColor?: string
  funcCallBack?: Function
}

const algo = ref(0)

withDefaults(defineProps<ButtonProps>(), {
  backgroundColor: '#2684FF',
  funcCallBack: () => 1 + 1,
})

const add = () => algo.value += (1 + 1)
</script>

<template>
  <div class="wrapper-button">
    <button type="button" class="button" @click="add">
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
  height: auto;
  transition: ease-out .2s;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.button:active {
  transform: translateY(2px);
}

.button:hover {
  opacity: 0.9;
  cursor: pointer;
}
</style>
