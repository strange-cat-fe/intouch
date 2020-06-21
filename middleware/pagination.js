module.exports = model => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = 5
    const countElems = await model.countDocuments().exec()

    const totalPages = Math.ceil(countElems / limit)

    const endIndex = countElems - limit * (page - 1)
    const startIndex = page === totalPages ? 0 : endIndex - limit

    const results = {}

    if (startIndex > 0) results.next = page + 1
    if (endIndex < countElems) results.previous = page - 1

    try {
      const posts = await model
        .find()
        .limit(endIndex - startIndex)
        .skip(startIndex)
        .exec()

      results.posts = posts.slice().reverse()
      res.paginatedResults = results

      next()
    } catch (e) {
      res.status(500).json({ data: e.message })
    }
  }
}
