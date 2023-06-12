<template>
  <Navbar />
</template>
  
<script lang="ts" setup>
    const { signOut } = useAuth()
    async function handleLogOut() {
        await signOut()
    }
</script>
  