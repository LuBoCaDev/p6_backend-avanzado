import createError from 'http-errors'
import { Product } from '../models/index.js'

export async function indexNew(req, res, next) {
  res.render('products/new')
}

export async function postNew(req, res, next) {
  try {
    const userId = req.session.userId
    const productData = req.body

    const product = new Product(productData)
    product.owner = userId
    product.price = Math.trunc(product.price * 100)
    product.tags = product.tags?.filter(tag => !!tag)
    product.avatar = req.file.filename

    const savedProduct = await product.save()

    res.redirect('/');
  } catch (error) {
    next(error)
  }
}

export async function deleteOne(req, res, next) {
  try {
    const userId = req.session.userId
    const productId = req.params.productId

    const product = await Product.findOne({ _id: productId })

    if (!product) {
      console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto inexistente (${productId})`)
      return next(createError(404, 'Not found'))
    }

    if (product.owner.toString() !== userId) {
      console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto (${productId}) propiedad de otro usuario (${product.owner})`)
      return next(createError(401, 'No autorizado'))
    }

    await Product.deleteOne({ _id: productId })

    res.redirect('/')

  } catch (error) {
    next(error)
  }
}