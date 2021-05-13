function check(req, res, next) {
  if (req.session?.user.id && req.session?.user.type === "admin") {
    return next();
  }
  return res.redirect("/");
}

module.exports = check;
