

const getAllProductStatic = async (req, res) => {
  res.status(200).json({msg: 'testing route'})
}

const getAllProduct = async (req, res) => {
  res.status(200).json({msg: 'get product'})
}

module.exports = {getAllProductStatic, getAllProduct}