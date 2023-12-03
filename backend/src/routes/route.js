const {Router} = require("express");
const {fetchAllUser, fetch, signup, fetchUserById} = require("../controllers/user");
const {register, login, checkAuth, loginUser} = require("../controllers/authController");
const router = Router();
const passport = require('passport');


router.route('/user').get(fetchAllUser)
router.route('/users').get(fetch)
router.route('/register').post(signup)
router.route('/login').post(passport.authenticate('local'),loginUser)
router.route('/check').get(passport.authenticate('jwt'),checkAuth)
router.route('/own').get(fetchUserById)

module.exports = router