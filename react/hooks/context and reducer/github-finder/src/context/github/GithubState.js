//actions
import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS} from '../types'

const req = async (urlBody) => {
    const result = await axios.get(
        `https://api.github.com/${urlBody}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    return result
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()

        const res = await req(`search/users?q=${text}&`)

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    const getUser = async (username) => {
        setLoading()

        const res = await req(`users/${username}?`)

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    const getUserRepos = async (username) => {
        setLoading()

        const res = await req(`users/${username}/repos?per_page=5&sort=created:asc&`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    const clearUsers = () => dispatch({type: CLEAR_USERS})

    const setLoading = () => dispatch({type: SET_LOADING})

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState
