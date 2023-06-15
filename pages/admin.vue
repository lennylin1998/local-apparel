<template>
    <pre>{{ data || 'not logged in' }}</pre>
    <div>{{ status }}</div>
</template>
<script lang="ts" setup>
    definePageMeta({ middleware: 'admin' })
    const { status, data } = await useAuth()

</script>