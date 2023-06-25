import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const userID = getUserID(event, session.user.email)
    const userLikedProducts = await event.context.prisma.likedProduct.findMany({
        where: {
            user_id: userID
        },
        include: {
            product: {
                include: {
                    brand: true
                }
            }
        }
    })
    return userLikedProducts ?? []
})
  