<template>
    <div class="w-full px-4">
        <div class="flex items-center text-center">
            <Button @click="router.back" severity="secondary" text>
                <i class="pi pi-arrow-left pr-2"></i>
                Back
            </Button>
        </div>
        <Divider />
        <div v-if="success" class="items-center justify-center">
            <div class="flex w-full items-center justify-center">
                <img class="h-80 md:h-96 w-5/6 object-cover" :src="`/images/${route.params.id}.jpg`">
            </div>
            <div class="flex w-full justify-center py-4">
                <div class="w-5/6 py-2">
                    <div>
                        <p class="text-3xl font-bold text-gray-700">{{ productDetail.name }}</p>
                    </div>
                    <div class="py-1 text-gray-400 text-2xl">
                        {{ productDetail.brand.name }}
                    </div>
                    <div class="space-x-2">
                        <ShareNetwork
                            v-for="(network) in socialSharingNetworks"
                            :network="network.network"
                            :url="`https://localhost/${route.fullPath}`"
                            title="Checkout the product I just found on LOCAL APPEREL!"
                            description="This is some beautiful peice of work!"
                            hashtags="localapparel"
                        >
                            <font-awesome-icon :icon="['fab', network.icon]" class="icon alt" style="font-size: 2rem;" />
                        </ShareNetwork>
                    </div>
                    <div class="text-xl font-medium space-y-1">
                        <p>Audience: {{ productDetail.audience }} </p>
                        <p>Price: NTD {{ productDetail.price.toLocaleString() }} </p>
                        <p>Description:</p>
                    </div>
                    <div class="md:text-lg">{{ productDetail.description }}</div>
                </div>
            </div>
        </div>
        <div v-else class="text-4xl font-bold text-gray-700 text-center">
            PRODUCT NOT FOUND
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute()
    console.log( route.fullPath)
    const router = useRouter()
    const { success, content: productDetail } = await $fetch('/api/productDetail/' + route.params.id)
    const socialSharingNetworks = [
        {
            network: 'facebook',
            icon: 'square-facebook'
        },
        {
            network: 'messenger',
            icon: 'facebook-messenger'
        },
        {
            network: 'line',
            icon: 'line'
        },
        {
            network: 'twitter',
            icon: 'twitter'
        }
    ]
</script>