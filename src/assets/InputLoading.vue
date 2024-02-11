<template>
  <div class="col-3">
    <div class="snippet" data-title="dot-flashing">
      <div class="stage">
        <div class="dot-flashing"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputLoading',
}
</script>

<style scoped>
.dot-flashing {
position: relative;
width: 3px;
height: 3px;
border-radius: 50%;
background-color: #550073;
color: #550073;
animation: dot-flashing 1s infinite linear alternate;
animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
content: "";
display: inline-block;
position: absolute;
top: 0;
}
.dot-flashing::before {
left: -6px;
width: 3px;
height: 3px;
border-radius: 50%;
background-color: #550073;
color: #550073;
animation: dot-flashing 1s infinite alternate;
animation-delay: 0s;
}
.dot-flashing::after {
left: 6px;
width: 3px;
height: 3px;
border-radius: 50%;
background-color: #550073;
color: #550073;
animation: dot-flashing 1s infinite alternate;
animation-delay: 1s;
}

@keyframes dot-flashing {
0% {
  background-color: #550073;
}
50%, 100% {
  background-color: rgba(225, 206, 232, 0.6);
}
}
</style>
