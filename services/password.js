const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { getUser } = require('../models/user');
const { createSession, getSession } = require('../models/sessions');

const jwtSecret = process.env.SECRET_JWT;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await getUser({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        const sessionId = await createSession(user.id);
        const payload = {
          sessionId,
        };
        const token = await jwt.sign(payload, jwtSecret);
        return done(null, token);
      } catch (e) {
        return done(e);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const session = await getSession({ id: payload.sessionId });
      if (!session) {
        return done(null, false);
      }
      const user = await getUser({ id: session.userId });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

module.exports = passport;
