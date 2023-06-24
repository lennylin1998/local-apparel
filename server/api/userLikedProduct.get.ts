import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return []
    }
    const userID = await getUserID(event, session.user.email)
    const userLikedProducts = await event.context.prisma.likedProduct.findMany({
        where: {
            user_id: userID
        }
    })
    return userLikedProducts ?? []
})
  