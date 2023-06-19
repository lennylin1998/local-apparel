<template>
  <div class="w-full px-2 ">
    <div>
      <SearchPane :filter="filter"/>
    </div>
    <div class="text-gray-900 justify-center">
      <pre>{{ filter }}</pre>
      <!-- <div v-for="(product) in products.data">
        <ProductCard />
      </div> -->
      <!-- <pre>{{ products.data }}</pre> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  const { data } = useAuth()
  const products = await useFetch('/api/products')

  // const searchPaneRef = ref(null)
  const filter = ref({price: 1000, brand: 'a'})

  // onMounted(() => {
  //   searchPaneRef.value.filter)
  // })
</script>