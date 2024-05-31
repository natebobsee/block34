async function requireUser(req, res, next) {
  
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } 
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

module.exports = {
  requireUser
}