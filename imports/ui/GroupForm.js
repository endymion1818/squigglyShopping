import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const createGroup = gql`
  mutation createGroup($name: String!) {
    createGroup(name: $name) {
      _id
    }
  }
`

class GroupForm extends Component {
  state = {
    error: null
  }
  submitForm = () => {
    this.props
      .createGroup({
        variables: {
          name: this.name.value
        }
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render() {
    return (
      <div className="group--form">
        {this.state.error && <p>{this.state.error}</p>}
        <input type="text" ref={input => (this.name = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createGroup, {
  name: "createGroup",
  options: {
    refetchQueries: ["Groups"]
  }
})(GroupForm)
