import { Router } from "express"

const controllers = require("@/book/controllers")
const cache = require("@/middleware/cache")
const hasAccess = require("@/middleware/access")
const router: Router = require("express").Router()

router.get("/", cache(5 * 60), controllers.getAllBook)
router.get("/:id", cache(5 * 60), controllers.getBook)
router.patch("/:id", hasAccess(1), controllers.updateBook)
router.delete("/:id", hasAccess(1), controllers.deleteBook)
router.post("/", hasAccess(1), controllers.createBook)

module.exports = router