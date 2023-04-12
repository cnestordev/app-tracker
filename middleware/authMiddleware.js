const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "No user is logged in" });
  }
};

const checkIdMatch = (req, res, next) => {
  const userId = req.params.id;
  if (req.user._id.equals(userId)) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = { checkAuth, checkIdMatch };
