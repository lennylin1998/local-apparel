export default defineEventHandler(async (event) => {
    const requstBody = await readBody(event)
    const userData = await event.context.prisma.user.findUnique({
        where: {
            email: (requstBody as any).email
        }
    })
    return userData
})
  