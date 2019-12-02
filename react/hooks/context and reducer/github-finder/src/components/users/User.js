import React, {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const User = ({match}) => {
    const githubContext = useContext(GithubContext)
    const {
        user: {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        },
        getUser,
        getUserRepos,
        repos,
        loading
    } = githubContext

    useEffect(() => {
        const login = match.params.login
        getUser(login)
        getUserRepos(login)
        //eslint-disable-next-line
    }, [])

    if (loading) return <Spinner />

    return (
        <>
            <Link to="/" className="btn btn-light">
                Back to search
            </Link>
            Hireable:{' '}
            {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" style={{width: 150}} alt="" />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </>
                    )}
                    <a href={html_url} className="btn btn-dark my-1" target="_blank" rel="noopener noreferrer">
                        Visit Github profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <>
                                    <strong>Username: </strong> {login}
                                </>
                            )}
                        </li>
                        <li>
                            {company && (
                                <>
                                    <strong>Company: </strong> {company}
                                </>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <>
                                    <strong>Website: </strong> {blog}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public repos: {public_repos}</div>
                <div className="badge badge-dark">Public repos: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </>
    )
}

export default User
