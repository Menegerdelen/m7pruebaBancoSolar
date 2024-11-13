const { Router } = require("express");
const { btController, ctController } = require("../controller/tController");


const router = Router()

router.get('/transferencias', btController)

router.post('/transferencia', ctController)

module.exports = router;