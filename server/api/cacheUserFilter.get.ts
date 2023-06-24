import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return null
    }
    const userID = await getUserID(event, session.user.email)
    const filterData = await useStorage().getItem(userID + '.filter')
    return filterData
  })