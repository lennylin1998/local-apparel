<template>
    <div class="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="lg:flex">
            <div class="md:shrink-0 lg:w-1/3 overflow-hidden">
                <img @click="directProductDetail" class="h-80 md:h-96 w-full object-cover transition duration-300 ease-in-out hover:scale-110" :src="`/images/${likedProductInfo.product_id}.jpg`" alt="Local Apparek Product">
            </div>
            <div class="p-8 space-y-2">
                <p class="text-2xl font-bold text-gray-700">{{ likedProductInfo.product.name }}</p>
                <div class="text-xl text-gray-400 font-semibold">{{ likedProductInfo.product.brand.name }}</div>
                <div class="block mt-1 text-lg leading-tight font-medium text-black space-y-2">
                    <p>Audience: {{ likedProductInfo.product.audience }}</p>
                    <p>Price: {{ likedProductInfo.product.price.toLocaleString() }}</p>
                </div>
                <p>{{ likedProductInfo.product.shortDescription }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps(['likedProductInfo'])
    const directProductDetail = async () => {
        await navigateTo('/products/' + props.likedProductInfo.product_id)
    }
</script>