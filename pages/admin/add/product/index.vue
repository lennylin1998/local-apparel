<template>
    {{ newProductID }}
</template>

<script land="ts" setup>
    const { data: newProductID } = useFetch('/api/admin/add/product')
</script>