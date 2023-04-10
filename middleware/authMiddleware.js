const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "No user is logged in" });
  }
};

module.exports = checkAuth;
