import React, { Component } from "react"

export default class LoginForm extends Component {
  state = {
    error: null
  }
  login = e => {
    e.preventDefault()
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      if (error) {
        this.setState({
          error: error.message
        })
      }
      this.props.client.resetStore()
    })
  }

  render() {
    return (
      <div className="login--form">
        <h1>Login here:</h1>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.login}>
          <div className="form--group">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              name="email"
              ref={input => (this.email = input)}
            />
          </div>
          <div className="form--group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={input => (this.password = input)}
            />
          </div>
          <button type="submit">Login User</button>
        </form>
      </div>
    )
  }
}
