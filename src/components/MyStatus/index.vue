<template>
  <div class="status" :class="{error:status===0}">{{ status === 1 ? text[1] : text[0] }}</div>
</template>

<script>
export default {
  name: 'MyStatus',
  props: {
    status: {
      type: Number,
      required: true
    },
    text: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.status {
  display: flex;
  align-items: center;

  &::before {
    display: block;
    margin-right: 6px;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #5ec480;
  }
}

.error {
  &::before {
    background: red;
  }
}
</style>
