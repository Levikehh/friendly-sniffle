const controllers = require("./controllers")
const hasAccess = require("../middleware/access")
const router = require("express").Router()

router.get("/", controllers.getBook)
router.get("/:id", controllers.getAllBook)
router.patch("/:id", hasAccess(1), controllers.updateBook)
router.delete("/:id", hasAccess(1), controllers.deleteBook)
router.post("/:id", hasAccess(1), controllers.createBook)

module.exports = router