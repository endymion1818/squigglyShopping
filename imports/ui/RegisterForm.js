import React, { Component } from "react"
import { Accounts } from "meteor/accounts-base"

export default class RegisterForm extends Component {
  state = {
    error: null
  }
  registerUser = e => {
    e.preventDefault()
    if (this.theanswer.value == "fortytwo") {
      Accounts.createUser(
        {
          email: this.email.value,
          password: this.password.value
        },
        error => {
          if (error) {
            this.setState({
              error: error.message
            })
          }
          this.props.client.resetStore()
        }
      )
    }
    console.log("that's the wrong answer")
  }

  render() {
    return (
      <div className="register--form">
        <h1>Register here:</h1>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.registerUser}>
          <div className="form--group">
            <label htmlFor="email">Email address:</label>
            <input type="email" ref={input => (this.email = input)} />
          </div>
          <div className="form--group">
            <label htmlFor="password">Password</label>
            <input type="password" ref={input => (this.password = input)} />
          </div>
          <div className="form--group">
            <label htmlFor="theanswer">What is the answer?</label>
            <input
              type="text"
              name="theanswer"
              ref={input => (this.theanswer = input)}
            />
          </div>
          <button type="submit">Register User</button>
        </form>
      </div>
    )
  }
}
