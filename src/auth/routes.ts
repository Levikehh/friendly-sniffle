import { Router } from "express"

const controllers = require("@/src/auth/controllers")
const router: Router = Router()

router.post("/login", controllers.login)
router.post("/register", controllers.register)

module.exports = router