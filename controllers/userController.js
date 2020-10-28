module.exports = function permission(roles = []) {
  return (req, res, next) => {
    // Convert string roles into array:
    if (typeof roles === 'string') {
      roles = [roles];
    }
    // check if a role is needed:
    if (roles.length > 0) {
    // Roles is needed, continue to check the role:
      if (
        req.user.role &&
        req.user.role.length &&
        roles.some(
            (roleInstance) => req.user.role.indexOf(
                roleInstance,
            ) >= 0,
        )
      ) { // The role from the token is okay:
        return next();
      } else {
        // The role from the token is not okay:
        return res.status(401).send('Error: access denied');
      }
    } else {
    // No role needed:
      next();
    };
  };
};
