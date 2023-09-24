

export async function findById(data: string, id: string) {
    console.log(`id "${id}" was provided`)
    const result = data.find((row) => row.id === id)
    return result || Promise.reject('No data')
}