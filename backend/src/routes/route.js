const {Router} = require("express");
const {fetchAllUser, fetch, signup, fetchUserById} = require("../controllers/user");
const { checkAuth, loginUser, logoutUser, register} = require("../controllers/auth");
const router = Router();


router.route('/user').get(fetchAllUser)
router.route('/users').get(fetch)
router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route('/check').get(checkAuth)
router.route('/own').get(fetchUserById)
router.route('/logout').get(logoutUser)

module.exports = router