import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import ItemForm from "./ItemForm"
import Item from "./Item"

const toggleAllItems = gql`
  mutation toggleAllItems($groupId: String!) {
    toggleAllItems(_id: $groupId) {
      _id
    }
  }
`

class Group extends Component {
  constructor(props) {
    super(props)
  }
  toggleAllItems = groupId => {
    this.props.toggleAllItems({
      variables: {
        id: groupId
      }
    })
  }
  render() {
    const { group } = this.props
    return (
      <li className="group">
        <div className="group--title">
          <h3
            style={{
              textDecoration: group.completed ? "line-through" : "none"
            }}
          >
            {group.name}
          </h3>
          {group.completed && (
            <button onChange={this.toggleAllItems(group._id)}>Reset</button>
          )}
        </div>
        <ul className="group--items">
          {group.items.map(item => (
            <Item item={item} key={item._id} />
          ))}
        </ul>
        <ItemForm groupId={group._id} />
      </li>
    )
  }
}

export default graphql(toggleAllItems, {
  name: "toggleAllItems",
  options: {
    refetchQueries: ["Groups"]
  }
})(Group)
