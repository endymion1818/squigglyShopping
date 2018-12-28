import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const createItem = gql`
  mutation createItem($name: String!, $groupId: String!) {
    createItem(name: $name, groupId: $groupId) {
      _id
    }
  }
`

class GoalForm extends Component {
  submitForm = () => {
    this.props
      .createItem({
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
      <div className="shoppinglist--itemform">
        <input
          type="text"
          ref={input => (this.name = input)}
          placeholder="broccoli"
        />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createItem, {
  name: "createItem",
  options: {
    refetchQueries: ["Group"]
  }
})(GoalForm)
