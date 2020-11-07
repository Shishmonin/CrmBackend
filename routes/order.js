const express = require('express');
const controller = require('../controllers/order');
const passport = require('passport');
const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}))

router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router;