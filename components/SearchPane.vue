
<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <!-- <Button @click="filter.price--" label="New" icon="pi pi-plus" class="mr-2" />
                <Button label="Upload" icon="pi pi-upload" severity="success" />
                <i class="pi pi-bars p-toolbar-separator mr-2" />
                <SplitButton label="Save" icon="pi pi-check" :model="items" severity="warning"></SplitButton> -->
                <div class="card flex justify-content-center">
                    <Dropdown @change="filter.brand = selectedCity.name" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
                </div>
            </template>

            <template #end>
                <Button icon="pi pi-search" class="mr-2" />
                <Button icon="pi pi-calendar" severity="success" class="mr-2" />
                <Button icon="pi pi-times" severity="danger" />
            </template>
        </Toolbar>
    </div>
</template>

<script lang="ts" setup>
    const items = ref([
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        },
        {
            label: 'Vue Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://vuejs.org/';
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                this.$router.push('fileupload');
            }
        }
    ])
    const selectedCity = ref();
    const cities = ref([
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
    ]);

    // const emit = defineEmits(['updateFilter'])
    const props = defineProps(['filter'])
    // function changeFilter() {
    //     emit('updateFilter', filter.price)
    // }
</script>