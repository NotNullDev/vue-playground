<script setup lang="ts">
const { data } = await useFetch("/api/notes/get-all-notes")

const note = ref({
    id: null as string | null,
    title: "",
    body: ""
})

function selectNote(selected: any) {
    note.value.body = selected.body
    note.value.title = selected.title
    note.value.id = selected.id
}

function clearNote() {
    note.value.body = ""
    note.value.title = ""
    note.value.id = null
}

async function saveNote() {
    const response = await $fetch("/api/notes/create", {
        body: {
            title: note.value.title,
            body: note.value.body,
            id: note.value.id
        },
        method: "POST"
    })
    await refreshNuxtData()
    clearNote()
}

async function deleteNote(noteId: string) {
    $fetch("/api/notes/delete", {
        method: "DELETE",
        body: {
            id: noteId
        }
    })
    refreshNuxtData()
}
</script>

<template>
    <div class="flex p-4">
        <div class="flex-1 flex flex-col gap-2 mx-auto">
            <form class="flex flex-col max-w-[400px] mx-auto gap-2" @submit="(e) => {
                e.preventDefault();
                saveNote();
            }">
                <input type="text" placeholder="title" name="title" class="input input-bordered"
                    v-model.trim="note.title" />
                <input type="text" placeholder="body" name="body" class="input input-bordered" v-model.trim="note.body" />
                <button class="btn btn-secondary">{{ note.id ? "update" : "create" }}</button>
            </form>
        </div>
        <div class="flex flex-col gap-2 flex-1">
            <div v-for="note in data?.notes" :key="note.id"
                class="bg-base-100 rounded-md p-4 flex justify-between items-center">
                <button class="flex flex-col flex-1" @click="() => selectNote(note)">
                    <div class="text-2xl font-semibold">{{ note.title }}</div>
                    <div>{{ note.body }}</div>
                </button>
                <button class="btn btn-error btn-sm" @click="() => deleteNote(note.id)">delete</button>
            </div>
        </div>
    </div>
</template>