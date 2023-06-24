import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return null
    }
    const userID = await getUserID(event, session.user.email)
    const body = await readBody(event)
    await useStorage().setItem(userID + '.filter', body, { ttl: 1800 })
  })