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
                        {{  formInput }}
                    </div>
                    <div class="py-1 text-gray-400 text-2xl">
                    </div>
                    <div class="space-x-2">
                            <font-awesome-icon v-for="(icon) in icons" :icon="['fab', icon]" class="icon alt" style="font-size: 2rem;" />
                    </div>
                    <div class="text-xl font-medium space-y-1">
                        <div class="flex items-center space-x-2">
                            <p>Audience:</p>
                            <Dropdown v-model="audienceField" :options="audiences" optionLabel="audience" :placeholder="productDetail.audience" class="w-14rem" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Category:</p>
                            <Dropdown v-model="categoryField" :options="categories" optionLabel="category" :placeholder="productDetail.category" class="w-20rem" />
                        </div>
                        <div class="flex items-center space-x-2">
                            <p>Price: NTD </p>
                            <InputNumber v-model="formInput.price" inputId="integeronly" />
                        </div>
                        <!-- <p>{{ productDetail.audience }} </p> -->
                        <p>Description:</p>
                    </div>
                    <div class="md:text-lg">
                        <Textarea v-model="formInput.description" rows="5" cols="30" class="w-full" />
                    </div>
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
    const router = useRouter()
    const { success, content: productDetail } = await $fetch('/api/productDetail/' + route.params.id)
    const icons = ['square-facebook','facebook-messenger','line','twitter']
    const onUpload = () => {
        return
    }

    const audienceField = ref(productDetail.audience)
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

    const formInput = ref({
        name: productDetail.name,
        brand: productDetail.brand.id,
        audience: productDetail.audience,
        price: productDetail.price,
        category: null,
        description: productDetail.description
    })
    const submitForm = () => {
        const res = useFetch('/api/admin/edit/product/uploadImage', {
            method: 'POST',
            body: fileInput
        })
    }
</script>