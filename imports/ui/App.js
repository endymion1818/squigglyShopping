import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { withApollo } from "react-apollo"
import GroupForm from "./GroupForm"
import GoalForm from "./ItemForm"
import Item from "./groups/Item"
import UserForm from "./UserForm"

const App = ({ loading, groups, client, user }) => {
  if (loading) return null
  return (
    <div>
      <UserForm user={user} client={client} />
      {user._id && <GroupForm />}
      {user._id && (
        <ul>
          {groups.map(group => (
            <li key={group._id}>
              <span
                style={{
                  textDecoration: group.completed ? "line-through" : "none"
                }}
              >
                {group.name}
              </span>
              <ul>
                {group.items.map(item => (
                  <Item item={item} key={item._id} />
                ))}
              </ul>
              <GoalForm groupId={group._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
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
