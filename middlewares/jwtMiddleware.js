const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig');


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


/**
 * A function to accept a request either from header or query
 * @param {Object} req - the incoming request object
 * @return {Object|null} - return the object if found the token\
 * or else return null
 */
function fromHeaderOrQuerystring(req) {
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}


/**
 * Verify jwt token
 *
 * Usage example in router :
 *
 *    app.post('/admin/menus',
 *    auth.verifyJwt('userLevel: 2'), (req, res) => {}
 *
 * // this example means the /admin/menus route
 * // may only be accessed by user with permission: 'userLevel: 2'
 * // permission will be declared automatically in login
 *
 * @param {String|Array} credentials the credentials required
 * @return {any} if the permission is okay, \
 * returns decodedPayload into req.user and next()
 */
function verifyJwt(credentials = []) {
  return (req, res, next) => {
    // Convert string credentials into array:
    if (typeof credentials === 'string') {
      credentials = [credentials];
    }
    // Allow request from header or query:
    const token = fromHeaderOrQuerystring(req);


    try {
      if (!token) {
        // If no token:
        res.status(401).send('Error: access denied');
      } else {
      // If token available, verify the token:
        jwt.verify(token, jwtConfig.secret, (err, decodedPayload) => {
        // If error:
          if (err) {
            return res.status(401).send(err);
          }
          // If no error, then continue:
          if (credentials.length > 0) {
            // If credentials is not null, continue to check the permision:
            if (
            // 1. The permission must be not falsy:
              decodedPayload.permissions &&
            // 2. The permission must be not empty:
            decodedPayload.permissions.length &&
            // 3. The permission must has the required credentials:
            credentials.some(
                (credential) => decodedPayload.permissions.indexOf(
                    credential,
                ) >= 0,
            )
            ) { // The Permission from the token is okay:
              req.user = decodedPayload;
              next();
            } else {
            // The Permission from the token is not okay:
              return res.status(401).send('Error: access denied');
            }
          } else {
          // If no credentials needed:
            req.user = decodedPayload;
            next();
          }
        });
      }
    } catch (err) {
      // catch any unknown error and response with:
      return res.status(500).send(err.message);
    }
  };
};


const jwtFunctions = {signJwt, verifyJwt};
module.exports = jwtFunctions;
