import Items from "./items"

export default {
  Mutation: {
    createItem(obj, { name, groupId }, { userId }) {
      if (userId) {
        const itemId = Items.insert({
          name,
          groupId,
          completed: false
        })
        return Items.findOne(itemId)
      }
      throw new Error("You are not logged in!")
    },
    toggleItem(obj, { _id }) {
      const item = Items.findOne(_id)
      Items.update(_id, {
        $set: {
          completed: !item.completed
        }
      })
      return Items.findOne(_id)
    },
    toggleAllItems(obj) {
      const item = Items.find()
      Items.update({
        $set: {
          completed: !item.completed
        }
      })
      return Items.find()
    }
  }
}
