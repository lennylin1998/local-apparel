<template>
    <div class="card flex align-items-center justify-content-center">
        <Card :pt="passTroughCard">
            <template #header>
                <div class="relative overflow-hidden">
                    <img @click="directProductDetail" :src="`images/${productInfo.id}.jpg`" class="h-72 w-full object-cover transition duration-300 ease-in-out hover:scale-110" />
                    <!-- <div class="absolute right-0 bottom-0 w-[100px] h-[100px]">
                        <div class="w-full h-full">
                            <Button icon="pi pi-heart" severity="danger" text rounded aria-label="Favorite" :pt="passThroughBuitton" />
                        </div>
                    </div> -->
                </div>
            </template>
            <template #title>
                <div class="flex justify-between">
                    <div>
                        {{ productInfo.name }}
                    </div>
                    <div>
                        <button @click="clickLikeProduct" class="w-full h-full"><i :class="heartIconClass" style="font-size: 2rem; color: #e60000"></i></button>
                    </div>
                </div>
            </template>
            <template #subtitle> {{ brandData.data.value[productInfo.brandId]?.name }} </template>
            <template #content>
                <p>
                    NTD {{ productInfo.price.toLocaleString() }}
                    <!-- {{ productInfo }} -->
                </p>
            </template>
            <!-- <template #footer>
                <div class="flex justify-start items-center text-center">
                    <Button icon="pi pi-check" label="Save" />
                    <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
                    <div>
                        <p class="text-gray-900" > HIII </p>
                    </div>
                    <a>THIS IS LINNK</a>
                </div>       
            </template> -->
        </Card>
    </div>
</template>
<script lang="ts" setup>
    const props = defineProps(['productInfo', 'brandData', 'productIsLiked'])
    const emit = defineEmits(['handleLikeProduct'])
    const heartIconClass = computed(() => {
        return props.productIsLiked ? 'pi pi-heart-fill' : 'pi pi-heart'
    })
    const passTroughCard = {
        root: { class: "w-full overflow-hidden" },
        // header: { class: 'object-cover' }
    }

    const clickLikeProduct = () => {
        emit('handleLikeProduct', {
            id: props.productInfo.id
        })
    }
    const directProductDetail = async () => {
        await navigateTo('/products/' + props.productInfo.id)
    }
</script>