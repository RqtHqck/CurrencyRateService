const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  logger = require('@utils/logger'),
  UserRepository = require('../features/auth/repository/auth.repository');

module.exports = passport => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT_KEY
  }

  passport.use(
    new JwtStrategy(options, async (payloads, done) => {
      try {
        const user = await UserRepository.findOne({ email: payloads.email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
      } catch (error) {
        logger.error('Error in JWT strategy:', error);
        done(error, false);
      }
    })
  )
}
