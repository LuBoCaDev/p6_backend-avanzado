export function changeLocale(req, res, next) {
    const locale = req.query.locale
  
    res.cookie('nodeapp-locale', locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30
    })
  
    res.redirect('back')
  }