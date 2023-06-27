<template>
    <div class="py-3 px-4 space-y-4">
        <Button @click="navigateTo('/admin/add/product/')" severity="secondary">
            Add New Product
        </Button>
        <Fieldset legend="Edit Products" :toggleable="true" :collapsed="true" class="space-y-4">
            <div class="py-3 px-4 space-y-4">
                <template v-for="(productInfo) in adminProduct">
                    <AdminProductView :admin-product-info="productInfo" />
                </template>
            </div>
        </Fieldset>
    </div>
</template>
<script lang="ts" setup>
    definePageMeta({ middleware: 'admin' })
    const { status, data } = await useAuth()
    const { data: adminProduct } = await useFetch('/api/admin/adminProduct')
</script>