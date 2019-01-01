import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import ItemForm from "./ItemForm"
import Item from "./Item"

const toggleItems = gql`
  mutation toggleItems {
    toggleItems
  }
`

class Group extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { group } = this.props
    return (
      <li>
        <h3
          style={{
            textDecoration: group.completed ? "line-through" : "none"
          }}
        >
          {group.name}
        </h3>
        <ul className="group--items">
          {group.items.map(item => (
            <Item item={item} key={item._id} />
          ))}
        </ul>
        <ItemForm groupId={group._id} />
        {group.completed && <button onChange={this.toggleItems}>Reset</button>}
      </li>
    )
  }
}

export default graphql(toggleItems, {
  name: "toggleItems",
  options: {
    refetchQueries: ["Groups"]
  }
})(Group)
