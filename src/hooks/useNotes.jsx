import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { create, getAll, update } from "../services/requests"

export const useNotes = () => {
    const queryClient = useQueryClient()

    // get all data
    const { isLoading, isError data: notes } = useQuery({
        queryKey: ['notes'],
        queryFn: getAll,
        refetchOnWindowFocus: false
    })

    // create a new note
    const newNoteMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries('notes')
        }
    })

    // update a note
    const updateNoteMutation = useMutation({
        mutationFn: update,
        onSuccess: () => {
            queryClient.invalidateQueries('notes')
        }
    })

    // Event Handlers

    const addNote = (note) => {
        newNoteMutation.mutate(note)
    }

    const toggleImportance = (note) => {
        updateNoteMutation.mutate({...note, important: !note.important})
    }

    return { notes, isLoading, isError, addNote, toggleImportance }
}