export default defineEventHandler(async (event) => {
    const brandName = event.context.params.name
    const brandDetail = await event.context.prisma.brand.findUnique({
        where: {
            name: brandName
        }
    })
    if (!brandDetail) {
        return { success: 0, data: "No Such Brand!"}
    }
    return { success: 1, data: brandDetail }
})
  