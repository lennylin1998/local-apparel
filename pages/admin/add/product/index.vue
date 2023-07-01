<template>
    <div class="w-full p-4 space-y-2 pb-20 h-full">
        <div class="flex items-center text-center">
            <Button @click="router.back" severity="secondary" text>
                <i class="pi pi-arrow-left pr-2"></i>
                Back
            </Button>
        </div>
        <Divider />
        <div class="flex w-full items-center justify-center">
            <img class="h-80 md:h-96 w-5/6 object-cover" :src="`/images/test.jpg`">
        </div>
        <p>Product ID: {{ newProductID }} </p>
        <div>Product Name: <InputText v-model="formInput.name" /></div>
        <div class="flex items-center space-x-2">
            <p>Price: NTD </p>
            <InputNumber v-model="formInput.price" inputId="integeronly" :min="0" />
        </div>
        <div class="card flex justify-content-center w-full">
            <Dropdown @change="formInput.brandId = selectedBrands?.id" v-model="selectedBrands" :options="brands" showClear optionLabel="brand" placeholder="Brands" class="w-[14rem]" />
        </div>
        <div class="card flex justify-content-center w-full">
            <Dropdown @change="formInput.audience = selectedAudience?.audience" v-model="selectedAudience" :options="audiences" showClear optionLabel="audience" placeholder="Audience" class="w-[14rem]" />
        </div>
        <div class="card flex justify-content-center w-full">
            <Dropdown @change="formInput.category = selectedCategories?.category" v-model="selectedCategories" :options="categories" showClear optionLabel="category" placeholder="Categories" class="w-[14rem]" />
        </div>
        <div class="flex items-center space-x-2">
            <p>Priority </p>
            <InputNumber v-model="formInput.priority" inputId="integeronly" />
        </div>
        <p>Short Description:</p>
        <div class="md:text-lg">
            <Textarea v-model="formInput.shortDescription" rows="5" cols="30" class="w-full" />
        </div>
        <p>Description:</p>
        <div class="md:text-lg">
            <Textarea v-model="formInput.description" rows="5" cols="30" class="w-full" />
        </div>
        <Button @click="handleSaveData" severity="primary">Add</Button>
        <Dialog v-model:visible="showDialog" modal header="Congradulations" :style="{ width: '50vw' }">
            <p>You have add a new product, now go check it out!</p>
            <template #footer>
                <Button label="Go" @click="navigateTo('/')" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script land="ts" setup>
    definePageMeta({ middleware: 'admin' })
    const router = useRouter()
    const { data: newProductID } = useFetch('/api/admin/add/newProductID')

    const selectedAudience = ref(null)
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

    const selectedCategories = ref(null)
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

    const selectedBrands = ref(null)
    const { data: brandData } = await useFetch('/api/brands')
    const brands = computed(() => {
        const _ = new Array()
        brandData.value.forEach((element) => {
            _.push({
                id: element.id,
                brand: element.name
            })
        })
        return _
    })

    const formInput = ref({
        id: newProductID.value,
        name: null,
        brandId: selectedBrands.value?.brand,
        audience: null,
        price: null,
        category: selectedCategories.value?.category,
        priority: null,
        shortDescription: null,
        description: null
    })

    const showDialog = ref(false)
    const handleSaveData = async () => {
        const { data: res } = await useFetch('/api/admin/add/addNewProduct', {
            method: 'POST',
            body: formInput.value
        })
        if (res.value.success) {
            showDialog.value = true
        }
    }

</script>