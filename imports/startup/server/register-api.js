import { createApolloServer } from "meteor/apollo"
import { makeExecutableSchema } from "graphql-tools"
import merge from "lodash/merge"

import GoalsSchema from "../../api/items/Item.graphql"
import GoalsResolvers from "../../api/items/resolvers"

import GroupsSchema from "../../api/groups/Groups.graphql"
import GroupsResolvers from "../../api/groups/resolvers"

import UsersSchema from "../../api/users/User.graphql"
import UsersResolvers from "../../api/users/resolvers"

// bfkjdslsfdaddfsaa

const typeDefs = [GoalsSchema, GroupsSchema, UsersSchema]

const resolvers = merge(GoalsResolvers, GroupsResolvers, UsersResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema })
