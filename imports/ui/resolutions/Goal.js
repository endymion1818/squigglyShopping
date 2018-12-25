import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`

class Goal extends React.Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    })
  }
  render() {
    const { goal } = this.props
    return (
      <li>
        <label
          htmlFor="goal"
          style={{
            textDecoration: goal.completed ? "line-through" : "none"
          }}
        >
          <input
            type="checkbox"
            name="goal"
            onChange={this.toggleGoal}
            checked={goal.completed}
          />
          {goal.name}
        </label>
      </li>
    )
  }
}
export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(Goal)
