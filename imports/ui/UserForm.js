import React, { Component } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

class UserForm extends Component {
  state = {
    login: true
  }
  render() {
    const { user, client } = this.props
    const { registerOrLogin } = this.state
    if (user._id) {
      return (
        <button
          onClick={() => {
            Meteor.logout()
            client.resetStore()
          }}
        >
          Logout
        </button>
      )
    }
    return (
      <div>
        {registerOrLogin ? (
          <LoginForm client={client} />
        ) : (
          <RegisterForm client={client} />
        )}
        <button
          onClick={() => this.setState({ registerOrLogin: !registerOrLogin })}
        >
          {registerOrLogin ? "Register" : "Login"}
        </button>
      </div>
    )
  }
}

export default UserForm
