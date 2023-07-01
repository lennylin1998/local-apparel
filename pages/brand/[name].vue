<template>
    <div class="w-full px-4">
        <div class="flex items-center text-center">
            <Button @click="router.back" severity="secondary" text>
                <i class="pi pi-arrow-left pr-2"></i>
                Back
            </Button>
        </div>
        <div class="flex w-full justify-center py-4">
            <div class="w-5/6 py-2">
                <div>
                    <p class="text-4xl font-bold text-gray-700" v-if="res.success">{{ res.data.name }}</p>
                    <p class="text-4xl font-bold text-gray-700" v-else>{{ res.data }}</p>
                </div>
                <p class="py-2 text-xl">{{ res.data?.description }}</p>
                <div class="pb-4" v-if="res.success">
                    <Button @click="handleDirectProduct" severity="primary" text>
                        Checkout Their Products
                        <i class="pi pi-arrow-right pr-2"></i>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute()
    const router = useRouter()
    const { data: res } = await useFetch('/api/brand/' + route.params.name)
    const handleDirectProduct = async () => {
        await navigateTo({
            path: '/',
            query: { brand: res.value.data?.id }
        })
    }
</script>