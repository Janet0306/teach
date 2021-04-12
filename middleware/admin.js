module.exports = function(req, res, next) {
  
  if (req.user.isAdmin !== true) {
    res.status(401)
    return res.send('Not an admin')
  }
    next()
};
