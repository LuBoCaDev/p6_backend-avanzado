import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function guard(req, res, next) {

  const authString = req.get('Authorization') || req.body.jwt || req.query.jwt

  console.log('tokenJWT', authString)

  if (!authString) {
    next(createError(401, 'no token provided'))
    return
  }

  const tokenJWT = authString.split(' ')[1]

  jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      next(createError(401, 'invalid token'))
      return
    }

    req.apiUserId = payload._id
    next()
  })
}