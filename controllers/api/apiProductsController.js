import Product from '../../models/Product.js'
import createError from 'http-errors'

export async function apiProductList(req, res, next) {
  try {
    const userId = req.apiUserId
       //http://localhost:3000/api/products/?name=Bicicleta&price=23015
    const filterPrice = req.query.age
    const filterName = req.query.name
        //http://localhost:3000/api/products/?limit=2&skip=2
    const limit = req.query.limit
    const skip = req.query.skip
        //http://localhost:3000/api/products/?sort=name
    const sort = req.query.sort
      // http://localhost:3000/api/products/?fields=name -_id
    const fields = req.query.fields
    
    const filter = { owner: userId }

    if (filterPrice) {
      filter.price = filterPrice
    }

    if (filterName) {
      filter.name = filterName
    }

    const [products, productCount] = await Promise.all([
      Product.list(filter, limit, skip, sort, fields),
      Product.countDocuments(filter)
    ])

    res.json({
      results: products,
      count: productCount
    })

  } catch (error) {
    next(error)
  }
}

export async function apiProductGetOne(req, res, next) {
  try {
    const userId = req.apiUserId
    const productId = req.params.productId

    const product = await Product.findOne({ _id: productId, owner: userId })

    res.json({ result: product })
  } catch (error) {
    next(error)
  }
}

export async function apiProductNew(req, res, next) {
  try {
    const userId = req.apiUserId
    const productData = req.body

    const product = new Product(productData)
    product.owner = userId
    product.avatar = req.file?.filename

    const savedProduct = await product.save()

    res.status(201).json({ result: savedProduct })
  } catch (error) {
    next(error)
  }
}

export async function apiProductUpdate(req, res, next) {
  try {
    const userId = req.apiUserId
    const productId = req.params.productId
    const productData = req.body
    productData.avatar = req.file?.filename

    const updatedProduct = await Product.findOneAndUpdate({ _id: productId, owner: userId }, productData, {
      new: true
    })

    res.json({ result: updatedProduct })
  } catch (error) {
    next(error)
  }
}

export async function apiProductDelete(req, res, next) {
  try {
    const userId = req.apiUserId
    const productId = req.params.productId

    const product = await Product.findOne({ _id: productId })

    if (!product) {
      console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto inexistente`)
      return next(createError(404))
    }

    if (product.owner.toString() !== userId) {
      console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto que es propiedad de otro usuario`)
      return next(createError(401))
    }

    await Product.deleteOne({ _id: productId })

    res.json()
  } catch (error) {
    next(error)
  }
}