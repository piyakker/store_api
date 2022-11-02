const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
  const products = await Product.find( queryObject )
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProduct = async (req, res) => {
  //find function
  const { featured, company, name, sort } = req.query
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

  let result = Product.find(queryObject)

  //sort function
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createAt')
  }
  const products  = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProductStatic, getAllProduct }