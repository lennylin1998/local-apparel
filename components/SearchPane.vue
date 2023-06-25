
<template>
    <div class="card">
        <Toolbar :pt="passThroughToolbar">
            <template #start>
                <div class="card flex justify-content-center w-full">
                    <Dropdown @change="updateAudience" v-model="selectedAudience" :options="audiences" showClear optionLabel="audience" placeholder="Audience" class="w-full" />
                </div>
                <div class="card flex justify-content-center w-full">
                    <MultiSelect @change="updateCategory" v-model="selectedCategories" :options="categories" optionLabel="category" placeholder="Categories" :showToggleAll="false" class="w-full" />
                </div>
                <div class="flex justify-center">
                    <Button @click="clickClearFilter" icon="pi pi-filter-slash" text severity="secondary" class="p-2"/>
                    <Button @click="clickSortProduct" :icon="sortIcon" text severity="secondary" class="p-2"/>
                </div>
            </template>
            <template #end>
            </template>
        </Toolbar>
        <PriceSlider ref="priceSliderRef" :filter="filter" class="card justify-content-center p-4" />
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps(['sortIcon'])
    const emit = defineEmits(['sortProduct'])
    const { filter, updateFilter } = inject('filter')

    const selectedAudience = filter.value.audience ? ref({ audience: filter.value.audience }) : ref(null)
    const audienceData = await useFetch('/api/audience')
    const audiences = computed(() => {
        const _ = new Array()
        audienceData.data.value.forEach((element) => {
            _.push({
                audience: element
            })
        })
        return _
    })
    const updateAudience = () => {
        updateFilter('audience', selectedAudience.value?.audience ?? '')
    }

    const selectedCategories = ref([])
    
    filter.value.category?.forEach((element) => {
        selectedCategories.value.push({ category: element })
    })

    const categoryData = await useFetch('/api/category')
    const categories = computed(() => {
        const _ = new Array()
        categoryData.data.value.forEach((element) => {
            _.push({
                category: element
            })
        })
        return _
    })

    const updateCategory = () => {
        const selectedCategoryArray = selectedCategories.value.map(item => item.category)
        updateFilter('category', selectedCategoryArray)
    }

    const priceSliderRef = ref(null)
    const clickClearFilter = () => {
        selectedAudience.value = null
        updateFilter('audience', '')
        selectedCategories.value = []
        updateFilter('category', [])
        priceSliderRef.value.clearPriceFilter()
        // emit('handleClearFilter')
    }

    const clickSortProduct = () => {
        emit('handleSortProduct')
    }

    const passThroughToolbar = {
        start: { class: 'justify-between w-full spcace-x-2' },
    }
</script>