const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
  const products = await Product.find( queryObject )
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProduct = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProductStatic, getAllProduct }