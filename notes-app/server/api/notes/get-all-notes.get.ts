import { sql } from "~/server/utils/db";
import { Note } from "~/server/utils/types";

export default defineEventHandler(async (event) => {
    console.log("in handler!")

    const notes = await sql<Note[]>`select * from notes`;

    return {
        notes
    }
})