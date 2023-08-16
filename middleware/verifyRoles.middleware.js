const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req?.roles) {
        res.status(401);
        throw new Error('Unauthorized');
      }

      const rolesArr = [...allowedRoles];

      const result = req.roles.map(role => rolesArr.includes(role)).find(val => val === true);

      if(!result) {
        res.status(401);
        throw new Error('Unauthorized');
      }

      next();
    } catch (err) {
      next(err, req, res);
    }
  }
}

module.exports = verifyRoles;