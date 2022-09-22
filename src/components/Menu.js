import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom";
import AnecdoteList from "./AnecdoteList";

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <>
            <Router>
                <div>
                    <Link style={padding} to="/">Anecdotes</Link>
                    <Link style={padding} to="/create">Create new anecdote</Link>
                    <Link style={padding} to="/about">About</Link>
                </div>
                <Routes>
                    <Route path="/" element={<AnecdoteList/> }/>

                </Routes>
            </Router>
        </>

        // <div>
        //     <a href='#' style={padding}>anecdotes</a>
        //     <a href='#' style={padding}>create new</a>
        //     <a href='#' style={padding}>about</a>
        // </div>
    )
}

export default Menu