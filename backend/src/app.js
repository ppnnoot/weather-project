const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const bcrypt = require('bcrypt');
const router = require('./routes/route')
const cors = require('cors')
const {cookieExtractor, sanitizeUser} = require("./service/service");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
require('dotenv').config()
// Middleware

app.use(express.json());

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(cookieParser());
app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
);
app.use(passport.authenticate('session'));
app.use(
    cors({
      exposedHeaders: ['X-Total-Count'],
    })
);

passport.use(
    'local',
    new LocalStrategy({ usernameField: 'username' }, async function (
        username,
        password,
        done
    ) {
        // by default passport uses username
        console.log({ username, password });
        try {
            const user = await User.findOne({ username: username });
            console.log(username, password, {user:user});
            if (!user) {
                return done(null, false, { message: 'invalid credentials' }); // for safety
            }
            /*crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                'sha256',*/
            const isPwdInvalid = await bcrypt.compareSync(password,user.password)
            if (!isPwdInvalid) {
                return done(null, false, { message: 'invalid credentials' });
            }
            const token = jwt.sign(
                sanitizeUser(user),
                process.env.JWT_SECRET_KEY
            );
            done(null, { id: user._id, token });
        } catch (err) {
            done(err);
        }
    })
);

passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            console.log(jwt_payload)
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, sanitizeUser(user)); // this calls serializer
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id });
    });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});



app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/api',router)


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});