import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useMatch, useNavigate
} from "react-router-dom"
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/create' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>
  )
}

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>votes: {anecdote.votes}</p>
            <p>for more info click <a href={anecdote.info} target="_blank">here</a></p>
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <li key={anecdote.id}>
                        <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

const About = () => (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
      Anecdote App 2022
    </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
    const info = useField('text')
    console.log(content, author, info)
    const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
      props.createNotification(`${content.value} by ${author.value} was added to the list`)
      navigate('/')
  }

  return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
        </form>
      </div>
  )
}

const Notification = ({ message }) => {
    const style = {
        border: 'solid',
        color: 'gray',
        borderWidth: 1,
        padding: 10
    }
    return message ? <div style={style}>{message}</div> : null
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
    console.log(anecdotes)
    const match = useMatch('/anecdotes/:id')
    console.log(match)
    const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  const [notification, setNotification] = useState('')
    const [notificationTimeout, setNotificationTimeout] = useState(null)

    const createNotif = (string) => {
      if (notificationTimeout) {
          setNotificationTimeout(clearTimeout(notificationTimeout))
      }
      setNotification(string)
        setNotificationTimeout(setTimeout(() => {
            setNotification(null)
        }, 5000))
    }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
      anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <>
        <div>
          <h1>Software anecdotes</h1>
          <Menu/>
            <Notification message={notification}/>
        </div>
        <Routes>
            <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>} />
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}/>
            <Route path="/create" element={<CreateNew addNew={addNew} createNotification={createNotif} />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
        <Footer/>
      </>
  )
}

export default App