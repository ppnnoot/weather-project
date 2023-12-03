const {authenticate} = require("passport");


exports.isAuth = (req, res, done) => {
    return authenticate('jwt');
};

exports.sanitizeUser = (user) => {
    return { id: user.id };
};


exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
