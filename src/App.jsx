import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getAll, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({ 
    mutationFn: createNote, 
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries('notes')
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (content) => {
    updateNoteMutation.mutate({...content, important: !content.important})
  }
  
  const { isLoading, data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(n =>
        <li key={n.id} onClick={() => toggleImportance(n)}>
          {n.content} 
          <strong> {n.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App