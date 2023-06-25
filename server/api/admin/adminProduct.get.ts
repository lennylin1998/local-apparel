export default defineEventHandler(async (event) => {
    const adminProducts = await event.context.prisma.product.findMany({
        include: {
            brand: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
    return adminProducts
})
  