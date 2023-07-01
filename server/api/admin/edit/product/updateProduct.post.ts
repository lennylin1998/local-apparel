export default defineEventHandler(async (event) => {
    const productDetail = await readBody(event)

    const targetAttributes = Object.fromEntries(
        Object.entries(productDetail).filter(([_, value]) => value !== null)
    );
    const res = await event.context.prisma.product.update({
        where: {
            id: productDetail.id
        },
        data: targetAttributes
    })

    return { success: res ? 1 : 0, act: 'updated'}

})
