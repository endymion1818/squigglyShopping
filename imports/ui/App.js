import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { withApollo } from "react-apollo"
import GroupForm from "./GroupForm"
import ItemForm from "./ItemForm"
import Item from "./groups/Item"
import UserForm from "./UserForm"
import "./styles.css"

const App = ({ loading, groups, client, user }) => {
  if (loading) return null
  return (
    <main>
      <UserForm user={user} client={client} />
      {user._id && (
        <ul className="shoppinglist--group">
          {groups.map(group => (
            <li key={group._id}>
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
            </li>
          ))}
        </ul>
      )}
      {user._id && <GroupForm />}
    </main>
  )
}

const GroupsQuery = gql`
  query Groups {
    groups {
      _id
      name
      completed
      items {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`

export default graphql(GroupsQuery, {
  props: ({ data }) => ({ ...data })
})(withApollo(App))
