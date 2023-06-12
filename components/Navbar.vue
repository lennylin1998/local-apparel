<template>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <span class="text-white font-bold text-xl">
              <NuxtLink to="/">APPAREL</NuxtLink>
            </span>
          </div>
          <div class="flex">
            <router-link
              to="/"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              active-class="bg-gray-900"
              exact
            >
              Home
            </router-link>
            <router-link
              to="/products"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              active-class="bg-gray-900"
            >
              Products
            </router-link>
            <button
              v-if="loggedIn"
              @click="handleLogOut"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
            <button
              v-else
              @click="handleLogIn"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script lang="ts" setup>
    const { status, signIn, signOut } = useAuth()
    const loggedIn = computed(() => status.value === 'authenticated')
    async function handleLogOut() {
        await signOut()
    }
    async function handleLogIn() {
      await signIn()
    }
</script>