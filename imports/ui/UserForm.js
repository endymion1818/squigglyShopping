import React, { Component } from "react"
import styled from "styled-components"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const Main = styled.main`
  height: 100vh;
  background: rebeccapurple;
`

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
      <main>
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
      </main>
    )
  }
}

export default UserForm
