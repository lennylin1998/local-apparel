export default defineEventHandler(async (event) => {
    const products = await event.context.prisma.product.findMany({
        orderBy: {
            priority: 'asc'
        }
    })
    return products
})
  