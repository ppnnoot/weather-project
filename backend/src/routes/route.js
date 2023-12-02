const {Router} = require("express");
const {fetchAllUser, fetch, signup} = require("../controllers/user");
const {register, login} = require("../controllers/authController");
const router = Router();


router.route('/user').get(fetchAllUser)
router.route('/users').get(fetch)
router.route('/register').post(signup)
router.route('/login').post(login)


module.exports = router