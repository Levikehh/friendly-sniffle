module.exports = {
    getBook: async (req, res) => {
        return res.send("Get book route")
    },
    getAllBook: async (req, res) => {
        return res.send("Get all book route")
    },
    updateBook: async (req, res) => {
        return res.send("Update book route")
    },
    deleteBook: async (req, res) => {
        return res.send("Delete book route")
    },
    createBook: async (req, res) => {
        return res.send("Create book route")
    }
}