const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
  const products = await Product.find( queryObject )
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProduct = async (req, res) => {

  //find function
  const { featured, company, name, sort, fields, numericFilters } = req.query
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
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    let regEx = /\b(>|>=|=|<|<=)\b/g
    let filter = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filters = filter.split(',').forEach((item) => {
      const [option, operator, value] = item.split('-')
      if (options.includes(option)) {
        queryObject[option] = { [operator]: value }
      }
    })
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

  //select function
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  
  const products  = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProductStatic, getAllProduct }