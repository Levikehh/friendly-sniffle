import { Router } from "express"

const controllers = require("@/src/category/controllers")
const cache = require("@/middleware/cache")
const hasAccess = require("@/middleware/access")
const router: Router = require("express").Router()

router.get("/", cache(5 * 60), controllers.all)
router.get("/:id", cache(5 * 60), controllers.get)
router.patch("/:id", hasAccess(1), controllers.update)
router.delete("/:id", hasAccess(1), controllers.delete)
router.post("/", hasAccess(1), controllers.create)

module.exports = router