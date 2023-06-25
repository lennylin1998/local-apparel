export default defineEventHandler(async (event) => {
    const regex = /^[A-Z0-9]{10}$/;
    const validProducID = regex.test(event.context.params?.id)
    if (!validProducID) {
        return { success: 0, content: "Cannot Find This Product!"}
    }
    const productDetail = await event.context.prisma.product.findUnique({
        where: {
            id: event.context.params.id
        },
        include: {
            brand: true
        }
    })
    return { success: 1, content: productDetail }
})

