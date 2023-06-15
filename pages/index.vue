<template>
  <Navbar />
  <pre>{{ data }}</pre>
</template>
  
<script lang="ts" setup>
  const { data } = useAuth()
</script>
  