import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const excluded = ['/api/v1/auth/signin', '/api/v1/auth/signup'];

  if (excluded.includes(req.route)) {
    try {
      const token = req.headers['authorization'];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (e) {
      console.log(e);
    }
  } else {
    next();
  }

}