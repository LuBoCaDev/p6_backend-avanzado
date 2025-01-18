import mongoose, { Schema } from 'mongoose';

const productSchema = Schema({
  name: { type: String, index: true },
  owner: { ref: 'User', type: Schema.Types.ObjectId, index: true },
  price: { type: Number, index: true },
  avatar: String,
  tags: { type: [String], index: true },
});

productSchema.statics.list = function(filter, skip, limit, sort, fields) {
  const query = Product.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

productSchema.methods.saluda = function() {
  console.log('Hola, soy  ' + this.name);
}

const Product = mongoose.model('Product', productSchema);

export default Product;