<template>
  <footer class="footer">
    <div class="footer-bottom" :class="align">
      {{ text }}
    </div>
  </footer>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '© 2024 Editorial Financial Steward. All rights reserved.',
  },
  align: {
    type: String,
    default: 'center',
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #f0f4f7;
  padding: 40px 0;
}

.footer-bottom {
  max-width: 1450px;
  margin: 0 auto;
  font-size: 12px;
  color: #9ca3af;
}
</style>
