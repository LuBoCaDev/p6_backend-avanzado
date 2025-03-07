import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import connectMongoose from './lib/connectMongoose.js'
import * as sessionManager from './lib/sessionManager.js'
import {homeController, loginController, productsController} from './controllers/index.js'
import upload from './lib/uploadConfigure.js'
import i18n from './lib/i18nConfigure.js'
import * as langController from './controllers/langController.js'
import * as apiProductsController from './controllers/api/apiProductsController.js'
import swaggerMiddleware from './lib/swaggerMiddleware.js'
import * as apiLoginController from './controllers/api/apiLoginController.js'
import * as jwtAuth from './lib/jwtAuthMiddleware.js'

// import basicAuthMiddleware from './lib/basicAuthMiddleware.js'


// espero a que se conecte a la base de datos
console.log('Connecting to DB...')
const { connection: mongooseConnection } = await connectMongoose()
console.log('Conectado a MongoDB en', mongooseConnection.name)

const app = express()

// view engine setup
app.set('views', 'views')
app.set('view engine', 'ejs')

app.locals.siteTitle = 'NodePop'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))


/**
 * API routes (v1)                                                                                                  // RETO 3: API
 */

app.post('/api/login', apiLoginController.loginJWT)                                                                 // POST /api/login

// CRUD operations for products resource
app.get('/api/products', jwtAuth.guard, apiProductsController.apiProductList)                                       // GET /api/products
app.get('/api/products/:productId', jwtAuth.guard, apiProductsController.apiProductGetOne)                          // GET /api/products/:productId
app.post('/api/products', jwtAuth.guard, upload.single('avatar'), apiProductsController.apiProductNew)              // POST /api/products         OJO: (2) 3:45:05
app.put('/api/products/:productId', jwtAuth.guard, upload.single('avatar'), apiProductsController.apiProductUpdate) // PUT /api/products/:productId
app.delete('/api/products/:productId', jwtAuth.guard, apiProductsController.apiProductDelete)                       // DELETE /api/products/:productId


/**
 * Website routes
 */

app.use(sessionManager.middleware, sessionManager.useSessionInViews)
app.use(i18n.init)
app.get('/change-locale/:locale', langController.changeLocale)
app.get('/change-locale', langController.changeLocale)

app.get('/', homeController.index)
// session
app.get('/login', loginController.indexLogin)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)
app.use('/api-doc', swaggerMiddleware)

{ // products
  const productsRouter = express.Router()
  // productsRouter.use(sessionManager.guard)
  productsRouter.get('/new', productsController.indexNew)
  productsRouter.post('/new', upload.single("avatar"), productsController.postNew)
  productsRouter.get('/delete/:productId', productsController.deleteOne)
  app.use('/products', sessionManager.guard, productsRouter)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)


// API error, send response with JSON
  if (req.url.startsWith('/api/')) {
    res.json({ error: err.message })
    return
  }


  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.render('error')
})

export default app
