<template>
    <div class="w-full py-3 px-8 md:px-4">
        <div>
            <SearchPane @handleSortProduct="sortProduct" :sort-icon="sortIcon" :filter="filter" />
        </div>
        <div class="pb-4">
            <Tab :brand-data="brandData" />
            <div class="justify-center">
                <!-- <pre>{{ filter }}</pre> -->
                <!-- <pre>{{ products }}</pre> -->
                <div class="grid lg:grid-cols-2 gap-4">
                    <template v-for="(product) in products">
                        <div v-if="showProduct(product)">
                            <ProductCard @handleLikeProduct="postToLikeProduct" :product-info="product" :brand-data="brandData" :product-is-liked="productIsLiked(product.id)"/>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="showDialog" modal :header="dialogData.header" :style="{ width: '50vw' }">
            <p>{{ dialogData.content }}</p>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="showDialog = false" text />
                <Button label="Yes" icon="pi pi-check" @click="handleLogIn" autofocus />
            </template>
        </Dialog>
    </div>
</template>
<script lang="ts" setup>
    const { signIn } = useAuth()
    async function handleLogIn() {
        showDialog.value = false
        await signIn()
    }

    const { data: products } = await useFetch('/api/products')
    const brandData = await useFetch('/api/brands')

    const ACTUAL_PRICE_CAP = 3000
    const { data: previousFilterData } = await useFetch('/api/cacheUserFilter')
    const filter = ref({
        priceBottom: 0,
        priceCap: 100,
        brand: 0,
        category: [],
        audience: '',
    })
    const updateFilter = (filterKey, updatedValue) => {
        filter.value[filterKey] = updatedValue
    }

    if (previousFilterData.value !== null) {
        filter.value = previousFilterData.value
    }
    provide('filter', { filter,  updateFilter })
    // provide variables that price filter needs
    const actualPriceBottom = computed(() => {
        return Math.floor((filter.value.priceBottom / 100) * ACTUAL_PRICE_CAP)
    })
    const actualPriceCap = computed(() => {
        return Math.floor((filter.value.priceCap / 100) * ACTUAL_PRICE_CAP)
    })
    provide('showPriceFilter', { actualPriceBottom, actualPriceCap })
    
    const sort = ref(null)
    const sortIcon = ref('pi pi-sort')
    const sortProduct = () => {
        if (sort.value === null) {
            products.value.sort((a, b) => b.price - a.price)
            sortIcon.value = 'pi pi-sort-down'
            sort.value = 'desc'
        } else if (sort.value === 'desc') {
            products.value.sort((a, b) => a.price - b.price)
            sortIcon.value = 'pi pi-sort-up'
            sort.value = 'asc'
        } else {
            products.value.sort((a, b) => a.id.localeCompare(b.id))
            sortIcon.value = 'pi pi-sort'
            sort.value = null
        }
    }
    // const clearFilter = () => {
    //     filter.value = {
    //         priceBottom: 0,
    //         priceCap: 100,
    //         brand: filter.value.brand,
    //         category: [],
    //         audience: '',
    //     }
    // }

    const showProduct = (productInfo) => {
        if ((productInfo.price < actualPriceBottom.value) || (productInfo.price > actualPriceCap.value)) {
            return false
        } else if ((filter.value.brand !== 0) && (productInfo.brandId !== filter.value.brand)) {
            return false
        } else if ((filter.value.category.length !== 0) && (!filter.value.category.includes(productInfo.category))) {
            return false
        } else if ((filter.value.audience !== '') && (productInfo.audience !== filter.value.audience)) {
            return false
        }
        return true
    }

    const { data: likedProductData, refresh } = await useFetch('/api/userLikedProduct')
    const userLikedProducts = computed(() => {
        const likedProducts = []
        likedProductData.value.forEach((element) => {
            likedProducts.push(element.product_id)
        })
        return likedProducts
    })
    const productIsLiked = (productID) => {
        return userLikedProducts.value.includes(productID)
    }

    const showDialog = ref(false)
    const dialogData = ref({ header: '', content: ''})
    const postToLikeProduct = async (product) => {
        const response = await $fetch('/api/clickLikeProduct', {
            method: 'POST',
            body: {
                productID: product.id,
            }
        })
        if (!response.success) {
            showDialog.value = true
            dialogData.value.header = response.msg.header
            dialogData.value.content = response.msg.content
            return
        }

        refresh()
    }

    onBeforeRouteLeave(async () => {
        const { data: resDataSuccess } = await useFetch('/api/cacheUserFilter', {
            method: 'POST',
            body: filter.value
        })
    })
</script>