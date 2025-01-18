import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

export const middleware = session({
  name: 'nodepop-session',
  secret: 'as989s587asd98ashiujkasas768tasdgyy',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },

  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
})

export function useSessionInViews(req, res, next) {
  res.locals.session = req.session
  next()
}

export function guard(req, res, next) {

  if (!req.session.userId) {
    res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`)
    return
  }
  next()
}