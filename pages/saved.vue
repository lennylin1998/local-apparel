<template>
    <div class="py-3 px-4 space-y-4">
        <template v-for="(likedProductInfo) in userSavedList">
            <CustomProductCard :liked-product-info="likedProductInfo" />
        </template>
        {{ userSavedList }}
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({ middleware: 'auth' })
    const { data: userSavedList } = await useFetch('/api/userSavedList')
    console.log('ure on userSavedList')
</script>