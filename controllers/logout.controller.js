const User = require('../models/user.model');

const handleLogout = async (req, res, next) => {
  try {
   /*  On client, also delete the accessToken 
    like reseting the state i.e. setToken(''); */

    const cookies = req.cookies;
    
    if(!cookies?.jwt) {
      return res.sendStatus(204);
    }
    
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({'refreshToken': refreshToken}).exec();

    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    };

    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);

  } catch(err) {
    next(err, req, res);
  }
}

module.exports = { handleLogout };