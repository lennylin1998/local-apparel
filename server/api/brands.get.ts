export default defineEventHandler(async (event) => {
    const brands = await event.context.prisma.brand.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return brands
})
  