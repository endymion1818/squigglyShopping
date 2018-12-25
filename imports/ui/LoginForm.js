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
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.login}>
          <input type="email" ref={input => (this.email = input)} />
          <input type="password" ref={input => (this.password = input)} />
          <button type="submit">Login User</button>
        </form>
      </div>
    )
  }
}
