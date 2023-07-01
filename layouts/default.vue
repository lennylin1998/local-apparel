<template>
    <div class="flex">
        <div class="flex px-4 hidden md:block">
            <div class="h-screen w-[220px] pt-1 flex-shrink-0 sticky top-0 bg-white z-50">
                <div class="flex items-center justify-center pt-3 pb-6">
                    <span class="text-center font-extrabold text-gray-800 text-2xl">LOCAL APPAREL</span>
                </div>
                <PanelMenu :model="itemsPanel" />
            </div>
        </div>
        <div class="flex flex-col w-full">
            <nav class="sticky top-0 bg-white z-50">
                <div class="relative flex h-16 items-center p-4">
                    <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <Button @click="visible = !visible" icon="pi pi-bars" text severity="secondary" />
                    </div>
                    <div class="flex flex-1 items-center justify-center md:hidden">
                        <span class="text-center font-extrabold text-gray-800 text-4xl">LOCAL APPAREL</span>
                    </div>
                    <div class="hidden md:block absolute inset-y-0 right-5 items-center justify-center">
                        <div class="flex flex-1 items-center justify-end h-full">
                            <p v-if="loggedIn" class="font-bold px-2">Welcome, {{ data?.name ?? 'Guest' }} !</p>
                            <Button v-if="loggedIn" @click="handleLogOut" icon="pi pi-sign-out" text severity="secondary" />
                            <Button v-else @click="handleLogIn" icon="pi pi-sign-in" text severity="secondary" />
                        </div>
                    </div>
                    <!-- <div class="hidden md:block flex flex-1 absolute inset-y-0 right-0 items-center w-full"></div> -->
                </div>
            </nav>
            <div class="w-full">
                <slot :brands="brandData" />
            </div>
        </div>
        <div class="card flex justify-content-center">
            <Sidebar v-model:visible="visible" :showCloseIcon="closeIcon" :pt="passThroughSidebar" class="sm:flex-shrink-0">
                <template #header>
                    <div class="flex items-center">
                        <div class="text-center">
                            <p class="font-bold">Welcome, {{ data?.name ?? 'Guest' }} !</p>
                        </div>
                        <Button v-if="loggedIn" @click="handleLogOut" rounded icon="pi pi-sign-out" text severity="secondary" />
                        <Button v-else @click="handleLogIn" rounded icon="pi pi-sign-in" text severity="secondary" />
                    </div>
                </template>
                <div>
                    <PanelMenu :model="itemsPanel" />
                </div>
            </Sidebar>
        </div>
        
    </div>
</template>
  
<script lang="ts" setup>
    // Nuxt Auth
    const { data, status, signIn, signOut } = useAuth()
    const loggedIn = computed(() => status.value === 'authenticated')
    async function handleLogOut() {
        await signOut({ callbackUrl: '/' })
    }
    async function handleLogIn() {
        await signIn()
    }
    // Sidebar- Don't show close icon
    const closeIcon = false

    // Sidebar- Config when size smaller than sm
    const visible = ref(false)   // togglable
    const closeSidebar = () => {
        visible.value = false
    }
    const passThroughSidebar = {
        content: { class: "space-y-4" },
    }

    const itemsPanel = ref([
        {
            label: 'Home',
            to: '/',
            icon: 'pi pi-home',
            command: () => {
                closeSidebar()
            }
        },
        {
            label: 'Brands',
            icon: 'pi pi-fw pi-th-large',
        },
        {
            label: 'Account',
            to: '/account',
            icon: 'pi pi-fw pi-user',
            command: () => {
                closeSidebar()
            }
        },
        {
            label: 'Saved List',
            to: '/saved',
            icon: 'pi pi-heart',
            command: () => {
                closeSidebar()
            }
        },
    ]);

    // Render brands
    const brandData = await useFetch('/api/brands')
    const brandItem = new Array()
    brandData.data._rawValue.map((brand) => {
    brandItem.push(
        {
            label: brand.name,
            to: '/brand/' + brand.name,
            command: () => {
                closeSidebar()
            }
        }
    )
    })
    itemsPanel.value[1].items = brandItem
    if (data.value?.role == 'ADMIN') {
        itemsPanel.value.push({
            label: 'Admin',
            to: '/admin/',
            icon: 'pi pi-cog',
            command: () => {
                closeSidebar()
            }
        })
    }
</script>