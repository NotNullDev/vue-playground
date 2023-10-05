export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    const result = await sql`DELETE FROM notes WHERE id = ${id}`

    return { result }
})