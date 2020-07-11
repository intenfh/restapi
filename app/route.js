const router = require('express').Router();
const patientController = require ('./patientController.js');

// Data Pasien routes
router.route('/Patient')
    .get(patientController.view)
    .post(patientController.new)
    .delete(patientController.delete)
    .put(patientController.update);


module.exports = router;

 