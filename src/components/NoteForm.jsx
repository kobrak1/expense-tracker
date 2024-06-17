const NoteForm = ({addNote}) => {  
    const handleSubmit = (event) => {
        event.preventDefault()
        const content = event.target.noteForm.value
        event.target.noteForm.value = ''
        addNote({content, important: true})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="noteForm" />
            <button type="submit">create</button>
        </form>
    )
}

export default NoteForm