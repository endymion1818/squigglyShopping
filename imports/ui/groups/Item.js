import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const toggleItem = gql`
  mutation toggleItem($id: String!) {
    toggleItem(_id: $id) {
      _id
    }
  }
`

class Item extends React.Component {
  toggleItem = () => {
    this.props.toggleItem({
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
            onChange={this.toggleItem}
            checked={item.completed}
          />
          {item.name}
        </label>
      </li>
    )
  }
}
export default graphql(toggleItem, {
  name: "toggleItem",
  options: {
    refetchQueries: ["Groups"]
  }
})(Item)
