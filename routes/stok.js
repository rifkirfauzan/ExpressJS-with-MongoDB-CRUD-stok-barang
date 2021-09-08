const router = require("express").Router();
const stokController = require("../controllers/stokController");

router.get("/", stokController.viewStok); 
router.post("/", stokController.addStok);
router.put("/", stokController.editStok);
router.delete("/:id", stokController.deleteStok);

module.exports = router;