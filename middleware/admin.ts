export default defineNuxtRouteMiddleware((to, from) => {
    const { data } = useAuth()
    if (data.value.role !== 'ADMIN') {
        if (to.path !== '/') {
            return navigateTo('/')
        }
    }
})
