const express = require("express")
const router = express.Router();
const fs = require('fs');
const hospitalRoutes = require('./hospitalmanagement.js')

router.use(hospitalRoutes)
module.exports = router;