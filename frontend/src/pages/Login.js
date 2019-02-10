import React, { Component } from 'react'

import twitterLogo from '../twitter.svg'
import './Login.css'

class Login extends Component {
  state = {
    username: ''
  }

  handleSubmit = e => {
    e.preventDefault()

    const { username } = this.state

    if (!username.length) return

    localStorage.setItem('@OpenChat:username', username)

    this.props.history.push('/timeline')
  }

  handleInputChange = e => {
    const { target: { value } } = e

    this.setState({
      username: value
    })
  }

  render () {
    const { username } = this.state

    return (
      <div
        className='login-wrapper'>
        <img
          src={twitterLogo}
          alt='twitter'
        />
        <form
          onSubmit={this.handleSubmit}>
          <input
            value={username}
            onChange={this.handleInputChange}
            placeholder='Nome do usuário'
          />
          <button
            type='submit'>
            Entrar
          </button>
        </form>
      </div>
    )
  }
}

export default Login
