<template>
    <div class="w-full px-4">
        <div class="flex items-center text-center">
            <Button @click="router.back" severity="secondary" text>
                <i class="pi pi-arrow-left pr-2"></i>
                Back
            </Button>
        </div>
    </div>
    <div class="w-full flex items-center justify-center">
        <div class="flex-col p-4 justify-center">
            <div class="flex items-center justify-center">
                <img :src="data.user.image" class="rounded-full w-48 h-48" />
            </div>
            <div class="flex-col p-10 space-y-2 text-xl md:text-2xl">
                <div class="flex">
                    <p class="font-bold pr-2">Username:</p>
                    {{ data.user.name }}
                </div>
                <div class="flex">
                    <p class="font-bold pr-2">Email:</p>
                    {{ data.user.email }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({ middleware: 'auth' })
    const router = useRouter()
    const { data } = useAuth()
</script>