const Note = ({ note, toggleImportance }) => {
  return (
    <li onClick={() => toggleImportance(note)}>
        {note.content}
        <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

export default Note
