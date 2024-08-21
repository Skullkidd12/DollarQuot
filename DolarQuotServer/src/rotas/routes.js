const {Router} = require('express');
const services = require('../servicos/controller')
const router = Router();
const cors = require('cors');
router.use(cors());
const express = require('express');
router.use(express.json());


router.post('/GetQuotation',services.mainFunc);


module.exports = router;