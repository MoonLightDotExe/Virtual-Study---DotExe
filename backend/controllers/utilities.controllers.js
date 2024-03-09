const util_repo = require('../repository/utilities.repository')

const self = (module.exports = {
  filterGroups: async (req, res) => {
    try {
      console.log(req.body)
      const data = await util_repo.filterGroups(req.body)
      console.log(data)
      res.json({
        success: true,
        data,
        msg: 'Chats Fetched Successfully',
      })
    } catch (err) {
      res.json({
        success: false,
        Error: err,
        msg: 'Failed to filter chats',
      })
    }
  },
})
