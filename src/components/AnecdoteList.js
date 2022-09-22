const AnecdoteList = ({ list }) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                { list.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>) }
            </ul>
        </div>
    )
}


export default AnecdoteList