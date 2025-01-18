import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

export async function loginJWT(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user || !(await user.comparePassword(password))) {
      next(createError(401, 'invalid credentials'))
      return
    }

    console.log(process.env.JWT_SECRET)

    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, tokenJWT) => {
      if (err) {
        next(err)
        return
      }
      res.json({ tokenJWT })
    })

  } catch (error) {
    next(error)
  }
}