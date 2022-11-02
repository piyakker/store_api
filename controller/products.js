const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
  const products = await Product.find( queryObject )
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProduct = async (req, res) => {
  //find function
  const { featured, company, name } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log(queryObject)

  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProductStatic, getAllProduct }