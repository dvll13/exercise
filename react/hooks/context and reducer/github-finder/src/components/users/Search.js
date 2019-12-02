import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = React.memo(() => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    const {searchUsers, clearUsers, users} = githubContext

    const [text, setText] = useState('')

    const onChangeHandler = (e) => {
        // const {name, value} = e.target
        // setState((prev) => ({
        //     ...prev,
        //     [name]: value
        // }))
        setText(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (text === '') {
            alertContext.setAlert('Please enter something', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    return (
        <div>
            {console.count('RENDER(Search)')}
            <form onSubmit={onSubmitHandler} className="form">
                <input type="text" name="text" placeholder="Search users..." value={text} onChange={onChangeHandler} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {users.length > 0 && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    )
})

export default Search
