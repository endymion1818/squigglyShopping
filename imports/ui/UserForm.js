import React from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

class UserForm extends React.Component {
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
      <div className="user--form">
        {registerOrLogin ? (
          <div>
            <RegisterForm client={client} />
            <br />
            <p>Already registered? Login below:</p>
          </div>
        ) : (
          <div>
            <LoginForm client={client} />
            <br />
            <p>Not registered yet? Create an account:</p>
          </div>
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
