const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
// here we check if the user is logged in and in the conroller we check if the user id matches

module.exports = router;