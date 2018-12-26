import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const createGoal = gql`
  mutation createGoal($name: String!, $groupId: String!) {
    createGoal(name: $name, groupId: $groupId) {
      _id
    }
  }
`

class GoalForm extends Component {
  submitForm = () => {
    this.props
      .createGoal({
        variables: {
          name: this.name.value,
          groupId: this.props.groupId
        }
      })
      .then(() => {
        this.name.value = ""
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => (this.name = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createGoal, {
  name: "createGoal",
  options: {
    refetchQueries: ["Group"]
  }
})(GoalForm)
