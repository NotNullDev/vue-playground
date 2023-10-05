export default defineEventHandler(async (event) => {
    const reqBody = await readBody(event)

    const { title, body, id } = reqBody

    if (id) {
        const result = await sql`UPDATE notes SET title = ${title}, body = ${body} WHERE id = ${id}`
        console.log(`successfully updated note with id ${id}: `)
        console.log(result);
    } else {
        const result = await sql`INSERT INTO notes (title, body) VALUES (${title}, ${body})`
        console.log(`successfully inserted note: `)
        console.log(result);
    }

    return {
        message: "omg it works!"
    }
})