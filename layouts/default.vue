<template>
    <div>
        <nav class="w-screen">
            <div class="relative flex h-16 items-center justify-between p-4">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Button @click="visible = !visible" icon="pi pi-bars" text />
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <span class="font-extrabold text-gray-800 text-2xl">LOCAL APPAREL</span>
                </div>
                <div class="hidden sm:block flex items-center sm:justify-end text-gray">
                    <Button v-if="loggedIn" @click="handleLogOut" icon="pi pi-sign-out" text />
                    <Button v-else @click="handleLogIn" icon="pi pi-sign-in" text />
                </div>
            </div>
        </nav>
        <div class="card flex justify-content-center sm:hidden">
            <Sidebar v-model:visible="visible" :showCloseIcon="closeIcon" :pt="passThrough" class="sm:flex-shrink-0">
                <div>
                    <PanelMenu :model="itemsPanel" />
                </div>
            </Sidebar>
        </div>
        <div class="flex">
            <div class="h-screen w-[220px] hidden sm:block pt-1">
                <PanelMenu :model="itemsPanel" />
            </div>
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    // Nuxt Auth
    const { data, status, signIn, signOut } = useAuth()
    const loggedIn = computed(() => status.value === 'authenticated')
    async function handleLogOut() {
        await signOut()
    }
    async function handleLogIn() {
        await signIn()
    }
    // Sidebar- Don't show close icon
    const closeIcon = false

    // Sidebar- Config when size smaller than sm
    const visible = ref(false)   // togglable
    const passThrough = {
        content: { class: "space-y-4" },
    }

    const itemsPanel = ref([
        {
            label: 'Explore',
            to: '/admin',
            icon: 'pi pi-home',
        },
        {
            label: 'Brands',
            icon: 'pi pi-fw pi-th-large',
        },
        {
            label: 'Account',
            to: '/account',
            icon: 'pi pi-fw pi-user',
        },
        {
            label: 'Saved List',
            to: '/saved',
            icon: 'pi pi-home',
        },
    ]);

    // Render brands
    const brandData = await useFetch('/api/brands')
    const brandItem = new Array()
    brandData.data._rawValue.map((brand) => {
    brandItem.push(
        {
        label: brand.name,
        to: '/brand/' + brand.name
        }
    )
    })
    itemsPanel.value[1].items = brandItem
</script>