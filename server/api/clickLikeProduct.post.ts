import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return {
            success: 0,
            msg: {
                header: 'Require Login',
                content: 'You have to login before such action. Would you like to login right now?'
            }
        }
    }

    const requestBody = await readBody(event)
    const productID = requestBody.productID
    const userID = await getUserID(event, session.user.email)
    
    const isProductLiked = await event.context.prisma.likedProduct.findUnique({
        where: {
            user_id_product_id: {
                user_id: userID,
                product_id: productID
            }
        }
    })

    let like: number = 0
    if (!isProductLiked) {
        const userLike = await event.context.prisma.likedProduct.create({
            data: {
                user_id: userID,
                product_id: productID,
            },
        })
        like = 1
    } else {
        const result = await event.context.prisma.likedProduct.delete({
            where: {
                user_id_product_id: {
                    user_id: userID,
                    product_id: productID,
                },
            },
        })
        like = -1
    }

    const productLike = await event.context.prisma.product.update({
        where: {
            id: productID
        },
        data: {
            likes: {
                increment: like
            }
        },
    })

    return { success: 1}
})