// middleware/checkRole.js
function checkRole(requiredRole) {
  return (req, res, next) => {
    // req.user is already populated by authenticationToken
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Role information missing' });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Access denied. Must be ${requiredRole}` });
    }
//if the role matches, continue
    next(); 
  };
}

module.exports = checkRole;