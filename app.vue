<script lang="ts" setup>
const { status, signIn, signOut} = useAuth()
async function handleSignIn() {
  await signIn()
} 
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
