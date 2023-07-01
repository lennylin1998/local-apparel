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
                     <!-- <div>
                        <h1>Upload Form</h1>
                        <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
                            <input name="photo" type="file" ref="fileInput" />
                            <button type="submit">Upload</button>
                        </form>
                    </div> -->
                    <!-- <FileUpload mode="basic" name="photo" url="./uploadImage" accept=".jpg" @upload="onUpload" /> -->
                    <div>
                        <p class="text-3xl font-bold text-gray-700">
                            Product Name: <InputText v-model="formInput.name" />
                        </p>
                    </div>
                    <div class="py-1 text-gray-400 text-2xl">
                    </div>
                    <div class="space-x-2">
                            <font-awesome-icon v-for="(icon) in icons" :icon="['fab', icon]" class="icon alt" style="font-size: 2rem;" />
                    </div>
                    <div class="text-xl font-medium space-y-1">
                        <div class="flex items-center space-x-2">
                            <p>Brands:</p>
                            <Dropdown @change="formInput.brandId = brandField?.id" v-model="brandField" :options="brands" optionLabel="brand" :placeholder="productDetail.brand.name" class="w-14rem" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Audience:</p>
                            <Dropdown @change="formInput.audience = audienceField?.audience" v-model="audienceField" :options="audiences" optionLabel="audience" :placeholder="productDetail.audience" class="w-14rem" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Category:</p>
                            <Dropdown @change="formInput.category = categoryField?.category" v-model="categoryField" :options="categories" optionLabel="category" :placeholder="productDetail.category" class="w-20rem" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Price: NTD </p>
                            <InputNumber v-model="formInput.price" inputId="integeronly" :min="0" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Priority </p>
                            <InputNumber v-model="formInput.priority" inputId="integeronly" :min="0" />
                        </div>
                        <!-- <p>{{ productDetail.audience }} </p> -->
                    </div>
                    <p class="text-xl font-medium py-2">Description:</p>
                    <div class="md:text-lg">
                        <Textarea v-model="formInput.description" rows="5" cols="30" class="w-full" />
                    </div>
                    <p class="text-xl font-medium py-2">Short Description:</p>
                    <div class="md:text-lg">
                        <Textarea v-model="formInput.shortDescription" rows="5" cols="30" class="w-full" />
                    </div>
                    <div class="py-4 space-x-4">
                        <Button @click="handleSaveData" severity="primary">Save</Button>
                        <Button @click="showCheckDialog = true" severity="danger">Delete</Button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-4xl font-bold text-gray-700 text-center">
            PRODUCT NOT FOUND
        </div>
        <Dialog v-model:visible="showDialog" modal header="Congradulations" :style="{ width: '50vw' }">
            <p>You have {{ act }} the product!</p>
            <template #footer>
                <Button label="OK" @click="handleFinishAct(act)" autofocus />
            </template>
        </Dialog>
        <Dialog v-model:visible="showCheckDialog" modal header="Warning" :style="{ width: '50vw' }">
            <p>Are you sure you want to delete this product?</p>
            <template #footer>
                <Button label="Cancel" @click="showCheckDialog = false"  severity="secondary"/>
                <Button label="Delete" @click="handleDeleteData" autofocus severity="danger" />
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({ middleware: 'admin' })
    const route = useRoute()
    const router = useRouter()
    const { success, content: productDetail } = await $fetch('/api/productDetail/' + route.params.id)
    const icons = ['square-facebook','facebook-messenger','line','twitter']
    const onUpload = () => {
        return
    }

    const audienceField = ref(null)
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

    const categoryField = ref(null)
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

    const brandField = ref(null)
    const brandData = await useFetch('/api/brands')
    const brands = computed(() => {
        const _ = new Array()
        brandData.data.value.forEach((element) => {
            _.push({
                id: element.id,
                brand: element.name
            })
        })
        return _
    })

    const formInput = ref({
        id: route.params.id,
        name: productDetail.name,
        brandId: null,
        audience: null,
        price: productDetail.price,
        category: null,
        priority: productDetail.priority,
        shortDescription: productDetail.shortDescription,
        description: productDetail.description
    })

    const act = ref(null)
    const showDialog = ref(false)
    const handleSaveData = async () => {
        const { data: res } = await useFetch('/api/admin/edit/product/updateProduct', {
            method: 'POST',
            body: formInput.value
        })
        if (res.value.success) {
            act.value = res.value.act
            showDialog.value = true
        }
    }

    const showCheckDialog = ref(false)
    const handleDeleteData = async () => {
        const { data: res } = await useFetch('/api/admin/edit/product/deleteProduct', {
            method: 'POST',
            body: { id: route.params.id}
        })
        if (res.value.success) {
            act.value = res.value.act
            showDialog.value = true
        }
    }

    const handleFinishAct = async (act) => {
        if (act == 'updated') {
            showDialog.value = false
        } else {
            await navigateTo('/admin')
        }
    }
</script>