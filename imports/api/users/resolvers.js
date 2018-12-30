// This gets whole user object

export default {
  Query: {
    user(obj, args, { user }) {
      return user || {}
    }
  },
  User: {
    email: user => user.emails[0].address,
    name: user => user.profile.name
  }
}
