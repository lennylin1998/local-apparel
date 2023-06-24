<template>
    <div class="card">
        <TabView @tab-click="tabClicked" :pt="passThroughView" :activeIndex="defaultTabIndex">
            <TabPanel v-for="brand in brandData.data.value" :key="brand.id" :header="brand.name" :pt="passThroughPannel" />
        </TabView>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps(['brandData'])
    const { filter, updateFilter } = inject('filter')
    if (props.brandData.data.value[0].name !== 'All Brands') {
        props.brandData.data.value.unshift({
            id: 0,
            name: 'All Brands'
        })
    }

    const defaultTabIndex = props.brandData.data.value.findIndex(obj => obj.id === filter.value.brand)

    const tabClicked = (event) => {
        updateFilter('brand', props.brandData.data.value[event.index].id)
    }

    const passThroughView = {
        nav: { class: 'w-full justify-between' }
    }
    const passThroughPannel = {
        header: { class: 'w-full' },
        headerAction: { class: 'items-center justify-center' }
    }
</script>