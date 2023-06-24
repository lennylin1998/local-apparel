export const getUserID = async (event, userEmail: string) => {
    const userID = await event.context.prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            id: true
        }
    })
    return userID.id
}