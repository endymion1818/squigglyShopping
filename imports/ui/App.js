import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { withApollo } from "react-apollo"
import GroupForm from "./GroupForm"
import Group from "./groups/Group"
import UserForm from "./UserForm"
import "./styles.css"

const App = ({ loading, groups, client, user }) => {
  if (loading) return null
  const sortedGroups = groups.slice().sort(group => {
    return group.completed === true
  })
  return (
    <main>
      <UserForm user={user} client={client} />
      {user._id && (
        <ul className="shoppinglist--group">
          {sortedGroups.map(group => (
            <Group group={group} key={group._id} />
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
