export const wait = async () => {
    return await new Promise((resolve) => setTimeout(resolve, 1000))
}