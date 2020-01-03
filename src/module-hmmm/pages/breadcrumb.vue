<template>
  <div class="v-breadcrumb" aria-label="breadcrumb">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: '',
    }
  },
  provide() { // https://cn.vuejs.org/v2/api/#provide-inject
    return {
      vBreadcrumb: this,
    };
  },
  mounted() {
    const items = this.$el.querySelectorAll('.v-breadcrumb_item');
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page');
    }
  },
};
</script>

<style>
</style>