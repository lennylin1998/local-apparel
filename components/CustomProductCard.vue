<template>
    <div @click="directProductDetail" class="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="lg:flex">
            <div class="md:shrink-0 lg:w-1/3">
                <img class="h-80 md:h-96 w-full object-cover" :src="`_nuxt/assets/${likedProductInfo.product_id}.jpg`" alt="Modern building architecture">
            </div>
            <div class="p-8">
                <p class="text-2xl font-bold text-gray-700">{{ likedProductInfo.product.name }}</p>
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
                <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps(['likedProductInfo'])
    const directProductDetail = async () => {
        await navigateTo('/product/' + props.likedProductInfo.product_id)
    }

</script>