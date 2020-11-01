const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig');
const passportJwt = require('passport');
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

passportJwt.serializeUser(function(user, done) {
  console.log('serializeUser');
  return done(null, user);
});

passportJwt.deserializeUser(function(user, done) {
  console.log('deserializeUser');
  return done(null, user);
});

passportJwt.use(new BearerStrategy(
    function(token, done) {
      jwt.verify(token, jwtConfig.secret, (err, user) => {
        console.log(user);
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
))


const jwtFunctions = {signJwt, passportJwt};
module.exports = jwtFunctions;
