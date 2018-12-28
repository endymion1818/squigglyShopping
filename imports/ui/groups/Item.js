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

class Item extends React.Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.item._id
      }
    })
  }
  render() {
    const { item } = this.props
    return (
      <li className="group--item">
        <label
          htmlFor="item"
          style={{
            textDecoration: item.completed ? "line-through" : "none"
          }}
        >
          <input
            type="checkbox"
            name="item"
            onChange={this.toggleGoal}
            checked={item.completed}
          />
          {item.name}
        </label>
      </li>
    )
  }
}
export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Groups"]
  }
})(Item)
