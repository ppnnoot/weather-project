const {Router} = require("express");
const {fetchAllUser, fetch} = require("../controllers/user");
const router = Router();


router.route('/user').get(fetchAllUser)
router.route('/users').get(fetch)


module.exports = router