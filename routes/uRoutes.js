const { Router } = require("express");
const { buController, cuController, uuController, duController } = require("../controller/uController");


const router = Router();


router.get('/usuarios', buController)

router.post('/usuario', cuController)

router.put('/usuario', uuController)

router.delete('/usuario/:id', duController)

module.exports = router;