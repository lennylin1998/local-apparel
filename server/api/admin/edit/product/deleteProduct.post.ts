export default defineEventHandler(async (event) => {
    const productID = await readBody(event)
    const deleteForeignKey = await event.context.prisma.likedProduct.deleteMany({
        where: {
            product_id: productID.id
        }
    })
    if (!deleteForeignKey) {
        return { success: 0 }
    }
    const res = await event.context.prisma.product.delete({
        where: {
            id: productID.id
        }
    })

    return { success: res ? 1 : 0, act: 'deleted' }

})
