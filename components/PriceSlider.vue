<template>
    <div>
        <div class="flex flex-column items-center justify-center">
            <div class="w-[300px]">
                <div class="flex justify-between">
                    <p>NTD {{ actualPriceBottom }}</p>
                    <p>-</p>
                    <p>NTD {{ actualPriceCap }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-column item-center justify-center p-3">
            <Slider @change="updatePrice" v-model="range" range :pt="passThroughSlider"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
// const props = defineProps(['priceCap'])
const { filter, updateFilter } = inject('filter')
const { actualPriceBottom, actualPriceCap } = inject('showPriceFilter')

const range = ref([filter.value.priceBottom, filter.value.priceCap])
// const priceRange = computed(() => {
//     return range.value.map((element) => {
//         return Math.floor((element / 100) * props.priceCap)
//     })
// })
const minPercentage = computed(() => {
    return Math.min(...range.value)
})
const maxPercentage = computed(() => {
    return Math.max(...range.value)
})
const updatePrice = () => {
    updateFilter('priceBottom', minPercentage.value)
    updateFilter('priceCap', maxPercentage.value)
}

const clearPriceFilter = () => {
    updateFilter('priceBottom', 0)
    updateFilter('priceCap', 100)
    range.value = [filter.value.priceBottom, filter.value.priceCap]
}

defineExpose({ clearPriceFilter })


const passThroughSlider = {
    root: { class: 'item-stretch w-full lg:w-[700px]' }
}

</script>