import Groups from "./groups"
import Items from "../items/items"

export default {
  Query: {
    groups(obj, args, { userId }) {
      return Groups.find({
        userId
      }).fetch()
    }
  },
  Group: {
    items: group => {
      return Items.find({
        groupId: group._id
      }).fetch()
    },
    completed: group => {
      const items = Items.find({
        groupId: group._id
      }).fetch()
      if (items.length === 0) return false
      const completedItems = items.filter(item => item.completed)
      return items.length === completedItems.length
    }
  },
  Mutation: {
    createGroup(obj, { name }, { userId }) {
      if (userId) {
        const groupId = Groups.insert({
          name,
          userId
        })
        return Groups.findOne(groupId)
      }
      throw new Error("You are not logged in!")
    },
    toggleAllItems(groupId) {
      const group = Groups.find(groupId).update(
        items.forEach(item => {
          item.completed == !this.item.completed
        })
      )
    }
  }
}
