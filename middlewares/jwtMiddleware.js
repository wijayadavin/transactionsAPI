const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;


/**
 * Create (sign) jwt token
 *
 * Usage example:
 *
 *    const payload = {
 *    id: result[0].id,
 *    permissions: 'userLevel: 2',
 *    };
 *    const token = signJwt(payload)
 *
 * // it means the signJwt function will return a token
 * // with payload mentioned above
 * //
 * // secret from: jwtConfig.secret
 * // option fron: jwtConfig.options
 *
 * @param {any} data data payload that want to be encoded as token
 * @return {String} jwt token
 */
function signJwt(data) {
  const token = jwt.sign(data, jwtConfig.secret, jwtConfig.options);
  return token;
}


passport.use(new BearerStrategy(
    function(token, done) {
      jwt.verify(token, jwtConfig.secret, (err, user) => {
        // if error, return error:
        if (err) {
          return done(err);
        }
        // if not authorized, return false:
        if (!user) {
          return done(null, false);
        }
        // if all is ok, return user payload
        return done(null, user);
      });
    },
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

const jwtFunctions = {signJwt, passport};
module.exports = jwtFunctions;
