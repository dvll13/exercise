import { Component } from 'react'

interface User {
  name: string
  age: number
}

interface UserSearchProps {
  users: User[]
}

interface UserSearchState {
  name: string
  user: User | undefined
}

class UserSearch extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: '',
    user: undefined
  }

  findUserHandler = () => {
    const foundUser = this.props.users.find((user) => user.name === this.state.name)
    this.setState({ user: foundUser })
  }

  render() {
    const { name, user } = this.state

    return (
      <div>
        User Search
        <input type="text" value={name} onChange={(e) => this.setState({ name: e.target.value })} />
        <button onClick={this.findUserHandler}>Find User</button>
        <p>
          {user && user.name}
          {user && user.age}
        </p>
      </div>
    )
  }
}

export default UserSearch
