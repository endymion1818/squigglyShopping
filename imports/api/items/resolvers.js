import Items from "./items"

export default {
  Mutation: {
    createGoal(obj, { name, groupId }, { userId }) {
      if (userId) {
        const goalId = Items.insert({
          name,
          groupId,
          completed: false
        })
        return Items.findOne(goalId)
      }
      throw new Error("You are not logged in!")
    },
    toggleGoal(obj, { _id }) {
      const item = Items.findOne(_id)
      Items.update(_id, {
        $set: {
          completed: !item.completed
        }
      })
      return Items.findOne(_id)
    }
  }
}
