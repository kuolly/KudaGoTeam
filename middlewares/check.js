function check(req, res, next) {
  if (req.session?.user._id && req.session?.user.admin === "admin") {
    return next();
  }

  return res.redirect("/");
}

module.exports = check;
