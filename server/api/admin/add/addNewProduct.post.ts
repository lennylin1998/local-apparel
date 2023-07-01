import fs from "fs";

export default defineEventHandler(async (event) => {
    const productDetail = await readBody(event)

    const res = await event.context.prisma.product.create({
        data: productDetail
    })

    const oldFilePath = 'public/images/test.jpg'
    const newFilePath = `public/images/${productDetail.id}.jpg`
    fs.copyFileSync(oldFilePath, newFilePath);

    return { success: res ? 1 : 0}

})
