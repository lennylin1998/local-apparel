export default defineEventHandler(async (event) => {

    const generateRandomString = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        return randomString;
    }
    let newProductID = ''
    let duplicateProductID = null

    do {
        newProductID = generateRandomString(10)
        duplicateProductID = await event.context.prisma.product.findUnique({
            where: {
                id: newProductID
            }
        })
    } while (duplicateProductID)
    return newProductID
})
