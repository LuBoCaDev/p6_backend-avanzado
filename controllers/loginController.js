import { User } from '../models/index.js';

export async function indexLogin(req, res, next) {
  res.locals.error = '';
  res.locals.email = '';
  res.render('login');
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password)) ) {
      res.locals.error = 'Invalid credentials';
      res.locals.email = email;
      res.render('login');
      return;
    }

    req.session.userId = user._id;
    req.session.userName = user.name;

    res.redirect(req.query.redirect ?? '/');

  } catch (err) {
    next(err);
  }
}

export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err);
    res.redirect('/');
  })
}
